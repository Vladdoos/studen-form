<template>
<div class="container-testing">
  <h1>Тестирование</h1>
  <preloader-block class="preloader" v-if="showPreloader"/>
  <div v-else class="block-tests">
    <div class="form" >
      <ul class="invisibleUl"
          :class="{visibleUl: index === show}"
          v-for="(questions, index) of dataTest.questions"
          :key="questions.index">
        <li :class="{display: actives}">
          <h2>{{questions.questionValue}}</h2>

          <ul class="block-ul">
            <li class="block-ul__li" v-for="(answer, index) of questions.answers" :key="index" >
              <input
                  type="radio"
                  class="checkbox"
                  v-if="!actives"
                  :id="answer.value"
                  :value="answer.value"
                  v-model="testAnswer"
                  @change="this.getArrAnswers(questions.id)"

              >
              <label  :for="answer.value">{{answer.value}}</label>
            </li>
            <div class="block-btn">
              <button v-if="!actives"
                      @click.left="prevAnswer(index)"
                      class="btn-next"
                      :disabled="disabled"
                      :class="{'btn-style': this.show === 0}"
              >{{textBtnPrev}}</button>
              <button v-if="!actives"
                      @click.left="pushAnswer()"
                      class="btn-next"
              >{{textBtnNext}}</button>
            </div>
          </ul>
        </li>
      </ul>

    </div>

  </div>
</div>
</template>

<script>
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "StartingTesting",
  components: {PreloaderBlock},
  data () {
    return {
      testAnswer: '',
      idTest: String,
      sessionId: '',
      dataTest: [],
      userAnswers: [],
      show: 0,
      actives: false,
      textBtnNext: 'Следующий вопрос',
      textBtnPrev: 'Предыдущий вопрос',
      disabled: true,
      showPreloader: true
    }
  },
  methods: {
    //Добавление ответа и id в массив
    getArrAnswers(el) {
      if (this.userAnswers.length === this.show) {
        this.userAnswers.push({id: el, answer: this.testAnswer})
        console.log(this.userAnswers)
        return

      }
      if (this.userAnswers.length > this.show) {
        this.userAnswers.splice(this.show, 1, {id: el, answer: this.testAnswer})
         this.testAnswer = this.userAnswers[this.show].answer
        console.log(this.userAnswers)
        console.log(this.testAnswer)
      }


    },
    // Листание вперед
    // Отправка теста на сервер
    pushAnswer() {
      if((this.show + 1) < this.dataTest.questions.length) {
        this.show++
        this.disabled = false
        this.getPrevValue()
        if ((this.show + 1) === this.dataTest.questions.length) {
          this.textBtnNext = 'Завершить тест'
          this.getPrevValue()
        }
      }
      else {
        fetch(`/result?sessionId=${this.sessionId}&testId=${this.idTest}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : "*",
            'Access-Control-Allow-Credentials' : true
          },
          body: JSON.stringify(
            this.userAnswers
          )
        })
            .then(response => response.json())
            .then(data => {this.dataTest = data;});
        window.location = '/StudentTesting';
      }
    },
    // Получение предыдущих ответов
    getPrevValue() {
      if (this.userAnswers[this.show]?.answer.length) {
        return this.testAnswer = this.userAnswers[this.show].answer
      }
    },
    // Листание назад
    prevAnswer() {
      if(this.show === 0) {
        this.disabled = true
      }
      if (this.textBtnNext === 'Завершить тест' || this.show > 0) {
        this.textBtnNext = 'Следующий вопрос'
        this.show = this.show - 1
        this.getPrevValue()
      }
    },
    // Скрыть прелоадер
    closePreloder() {
      setTimeout(() => (
          this.showPreloader = false
      ), 700);
    }
  },
  created() {
    // Получение id теста
    // Получение теста с сервера
    this.idTest = this.$route.query.id
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    fetch(`/test/id?sessionId=${this.sessionId}&id=${this.idTest}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {this.dataTest = data;});
  },
  mounted() {
    this.closePreloder()
  },
}
</script>

<style scoped>
.invisibleUl{
  display: none;
}
.visibleUl{
  display: block;
}
h2 {
  width: 448px;
  display: flex;
  justify-content: center;
  font-size: 22px;
  line-height: 28px;
  color: #49485E;
}
.display{
  display: block !important;
}
.container-testing{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
.block-tests{
  display: flex;
  justify-content: center;
}
.form{
  background: white;
  display: flex;
  flex-direction: column;
  width: 450px;
  height: auto;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 22px 24px 40px;
}

ul{
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
  width: auto;
  justify-content: space-between;
  display: flex;
}
li{
  font-size: 25px;
  display: block;
  margin-bottom: 20px;
}
input{
  width: 250px;
  height: 22px;
  font-size: 20px;
}
.block-ul{
  display: block;
}
.block-ul__li{
  display: flex;
  flex-wrap: wrap;
}
.block-ul__li p{
  margin: 0;
}
.block-ul__li input{
  width: 50px;
  height: 22px;
  font-size: 20px;
  margin-right: 25px;
}

label{
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  color: #49485E;
}

.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}
.checkbox + label {
  position: relative;
  padding: 0 0 0 60px;
  cursor: pointer;
  text-align: left;
}
.checkbox + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 13px;
  background: #FFFFFF;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2);
  transition: .2s;
  border: 1px solid #BDBDBD;
}
.checkbox + label:after {
  content: '';
  position: absolute;
  top: 8px;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  transition: .2s;
}

.checkbox:checked + label:after {
  background: #26AF11;
}
button{
  width: 180px;
  height: 45px;
  background: #7BAE73;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFEFB;
  margin: 50px auto 0;
  border: 0;
  display: block;
  cursor: pointer;
}
.btn-style{
  background: silver;
  cursor: default;
}
.block-btn{
  display: flex;
}
</style>
