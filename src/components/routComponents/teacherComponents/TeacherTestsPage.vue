<template>
  <div>
    <header-component/>
    <modal-block
        :isShowModal="isShowModal"
        @getOpenModal="getDataModal"
    />
    <div class="container-tests">
      <h1>Все тесты</h1>
      <preloader-block class="preloader" v-if="showPreloader"/>
      <ul v-else class="block-test">
        <li v-for="test of dataTest" :key="test.index">
          <div class="text-test">{{test.testName}}</div>
          <div class="block-btn">
            <div v-if="test.accept">
            <select  v-model="selectedGroup">
              <option
                  v-for="(option, index) in dataGroup"
                  :value="option.id"
                  :key="index"
              >{{option.groupName}}</option>
            </select>
            </div>
            <button @click="sendTest(test)"
                    :class="{'btn-send--yellow': test.accept}"
                    class="btn-send">
              Отправить</button>
          </div>
          <button @click="deleteTest(test.id)" class="btn-del">Удалить</button>
        </li>
      </ul>


      <div class="form">
        <h2>Добавить тест</h2>
        <p class="log">Название</p>
        <input
            class="inp-name-test"
            v-model="nameTest"
            :class="{ 'inp-error': this.error.name}"
            @blur="error.name = false"
        >
        <p class="error-text" v-if="this.error.name">Поле является обязательным</p>
        <p class="password">Загрузите тест</p>
        <input
            class="inp-file-test"
            type="file" id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            @blur="error.file = false"
        >
        <p class="error-text" v-if="this.error.file">Поле является обязательным</p>

        <div class="container-btn">
         <button @click="checkValidation()" class="btn-add">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import ModalBlock from "@/components/unitComponents/modalBlock";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "TeacherTestsPage",
  components: {PreloaderBlock, ModalBlock, HeaderComponent},
  data () {
    return {
      dataTest: [],
      sessionId: '',
      isShowModal: false,
      file: '',
      dataGroup: [],
      parsingFile: '',
      nameTest: '',
      dataUser: [],
      showPreloader: true,
      error: {
        name: false,
        file: false,
      },
      selectedGroup: 'allGroup',
    }
  },
  methods: {
    // Загрузка файла
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];

      this.parsingFile = await this.loadFile(this.file)
    },
    // Получение данных из файла
    loadFile (file) {
      return new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = function(event) {
          let data = event.target.result
          resolve(data)
        };
        reader.readAsText(file);
      })
    },
    // Прарсинг полученных данных
    //Показ Модального окна
    // Отправка данных на сервер
    async submitFile() {
      this.showPreloader = true
      this.parsingFile = JSON.parse(this.parsingFile)
      await fetch(`test?sessionId=${this.sessionId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testName: this.nameTest,
          questions: this.parsingFile.questions
        })
      })
          .then(response => response.json())
          .then(data => {console.log(data)})
          .catch(error => {
            console.log(error);
          });
      this.showPreloader = false
      this.isShowModal = true
      document.querySelector('input[type=file]').value = '';
      this.nameTest = ''
      await this.getTest()
    },
    // Валидация формы добавления теста
    checkValidation () {
      if (!this.file) {
        this.error.file = true
      }
      if (!this.nameTest) {
        this.error.name = true
      }
      if (this.file && this.nameTest) {
        this.submitFile()
      }
    },

    sendTest(item) {
      // Показ инпута со списком групп
      if (item.accept === false) {
        return item.accept = true
      }
      //Отправка теста всем группам
      if (item.accept === true) {
        if(this.selectedGroup === 'allGroup') {
          fetch(`test/allGroup?testId=${item.id}&sessionId=${this.sessionId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
          })
        }
        else {
          //Отправка теста конкретной группе
          fetch(`test?testId=${item.id}&sessionId=${this.sessionId}&groupId=${this.selectedGroup}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
          })
        }
        return item.accept = false
      }
    },
    // Получение данных о модальном окне
    getDataModal (data) {
      this.isShowModal = data
    },
    // Получение данных о тестах
    getTest() {
      fetch(`test?sessionId=${this.sessionId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => response.json())
          .then(data => {return this.dataTest = data});
    },
    // Удаление теста
    async deleteTest (id) {
      await fetch(`test?testId=${id}&sessionId=${this.sessionId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
       await this.getTest()
    },
  },
  async created() {
    // получаем sessionId из localStorage
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    this.getTest()
    // получаем данные о пользователе
    await fetch(`auth/sessionId?sessionId=${this.sessionId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataUser = data});
    // Получаем данные по группам пользователя
    await fetch(`student/group/byTeacherId?teacherId=${this.dataUser.id}&sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataGroup = data});
    this.dataGroup.push({id: 'allGroup', groupName: 'Всем группам'})
    this.showPreloader = false
  }
}
</script>

<style scoped>
.container-tests{
  display: flex;
  flex-wrap: wrap;
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
  width: 100%;
}
ul{
  height: inherit;
  padding: 0;
  text-align: left;
}
li{
  list-style-type: none;
  margin: 0 0 40px 65px;
  display: flex;
}
.text-test {
  font-size: 18px;
  line-height: 31px;
  color: #49485E;
  margin: 0;
  width: 315px;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.btn-send,
.btn-del{
  width: 147px;
  height: 25px;
  color: #FFFEFB;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  border: 0;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.btn-send{
  background: #7BAE73;
  border-radius: 10px;
  margin-top: 5px;
}
.btn-send:hover{
  background: #FFFEFB;
  color: #7BAE73;
  border: 1px solid #7BAE73;
}

.btn-del{
  background: #F40C0C;
  border-radius: 3px;
  margin-top: 5px;
}
.btn-del:hover{
  background: #FFFEFB;
  color: #F40C0C;
  border: 1px solid #F40C0C;
}

.container-btn{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.form{
  background: white;
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 360px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px 24px 20px;
  margin-left: auto;
}
h2{
  font-weight: 400;
  font-size: 22px;
  line-height: 35px;
  color: #26AF11;
}
.inp-name-test{
  height: 36px;
  left: 835px;
  top: 286px;
  background: #FFFEFB;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid whitesmoke;
}
:active, :hover, :focus {
  outline: 0;
  outline-offset: 0;
}
p{
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #49485E;
  margin: 24px 0 0 16px;
  position: relative;
}
.password:after,
.log:after{
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FF8484;
  position: absolute;
}
.password:after{
  top: 0;
  left: 93px;
}
.log:after{
  top: 0;
  left: 61px;

}

.btn-add{
  padding: 12px 65px;
  background: #7BAE73;
  border-radius: 14px;
  border: 2px solid #7BAE73;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #FFFEFB;
  margin-top: 50px;
}
.btn-add:hover{
  background: #61e431;
}
.block-btn{
  display: flex;
  flex-direction: column;
  margin: 0 40px 0 50px;
}
select{
  background: #FFFEFB;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #737361;
  border: #FFFEFB;
  padding: 11px 12px 11px 16px;
  width: 147px;
  height: 36px;
  margin-bottom: 24px;
}

select:active, select:focus{
  outline:none
}
.btn-send--yellow{
  background: #D7E633;
}
.inp-file-test{
  margin: 15px 0 0 15px;
}
.inp-error{
  border: 1px solid #FF8484;
}
.error-text{
  margin: 0 0 0 20px;
  color: #FF8484;
  font-size: 11px;
}
.preloader{
  width: 65%;
  margin-top: 116px;
}
</style>
