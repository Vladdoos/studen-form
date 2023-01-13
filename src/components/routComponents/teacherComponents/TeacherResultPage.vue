<template>
  <div>
    <header-component/>
    <div class="container-allResult">
      <h1>Результаты студентов</h1>
      <preloader-block v-if="showPreloader"/>
      <ul v-else class="block-group">
        <li class="block-group__li"
            v-for="test of dataResult"
            :key="test.index"
        >
          <p>{{test.test.testName}}</p>
          <div class="block-i i-test" @click="showGroup(test)">
            <i class="arrow down" :class="{up: test.visible}"></i>
          </div>

          <ul class="block-list" v-if="test.visible">

            <li v-for="group of test.studentGroups" :key="group.index">
              <div class="block-group__text" @click="showList(group)">
                <p >{{group.groupName}}</p>
                <p class="block-list__text">средняя оценка по группе:</p>
                <p class="block-list__average">{{getAverageRating(group)}}</p>
                <div class="block-i i-group">
                  <i class="arrow down" :class="{up: group.visible}" ></i>
                </div>
              </div>
              <ul class="block-list" v-if="group.visible">
                <li v-for="student of group.students" :key="student.index">
                 <p class="block-list__student">{{student.student.user.lastName}} {{student.student.user.firstName}} {{student.student.user.midletName}}</p>
                  <p class="block-list__average-student">{{getResult(student.result, test.maxScoreByTest)}}</p></li>
              </ul>

            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "ResultPage",
  components: {PreloaderBlock, HeaderComponent},
  data() {
    return {
      dataUser: [],
      dataResult: [],
      showPreloader: true,
    }
  },
  methods: {
    // Остановка прелоадера
    closePreloder() {
      setTimeout(() => (
          this.showPreloader = false
      ), 700);
    },
    // Показ/скрытие групп
    showGroup(item) {
      if (item.visible === false) {
        return item.visible = true
      }
      if (item.visible === true) {
        return item.visible = false
      }
    },
    // Показ/скрытие студентов
    showList(group) {
      if (group.visible === false) {
        return group.visible = true
      }
      if (group.visible === true) {
        return group.visible = false
      }
    },
    // Получение оценки студента
    getResult(item, max) {
      if (item === null) {
        return "Не пройден"
      } else {
        return item.scoreByTest + ' / ' + max
      }
    },
    getTestMet() {

    },
    // Вычисление средний оценки группы
    getAverageRating(g) {
      let result = 0
      let i = 0
      for (let arr of g.students) {
        if (arr.result !== null) {
          result = arr.result.scoreByTest + result
          i = i + 1
        }
      }
      if (i === 0) {
          return 'Тест не пройден'
      }
      else {
      return result / i
      }
    }
  },
  async created() {
    // получаем sessionId из localStorage
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    // Получаем данные результатов
    await fetch(`/result/groups?sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {
           this.dataResult = data;
        });
    for(let item of this.dataResult) {
      item.visible = false
      for (let arr of item.studentGroups) {
        arr.visible = false
      }
    }

  },
  mounted() {
    this.closePreloder()
  },
}
</script>

<style scoped>
.container-allResult{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
ul{
  height: inherit;
  padding: 0;
  text-align: left;
}
li{
  list-style-type: none;
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin-bottom: 16px;
  position: relative;
}
.block-group__li{
  display: flex;
  width: 58%;
  justify-content: left;
  flex-wrap: wrap;
}
p{
  margin: 0;
}
i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin: 7px;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.block-group{
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.block-list{
  margin: 15px 0 0 50px;
  cursor: default;
  width: 100%;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  margin: 3px 3px 3px 8px;
}
.block-i{
  position: absolute;
  cursor: pointer;
}
.i-test{
  padding-left: 73%;
  top: 2px;
}
.i-group{
  left: -30px;
}
.block-list__text{
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin: -4px 0 0 72px;
}
.block-list__average-student,
.block-list__average{
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  color: #26AF11;
}
.block-list__student{
  font-size: 19px;
}
.block-list__average{
  margin: -4px 0 0 25px;
}
.block-list__average-student{
  margin: 0 0 0 25px;
}
.block-list li{
  display: flex;
  flex-wrap: wrap;
}
.block-group__text{
  cursor: pointer;
  display: flex;
}
</style>
