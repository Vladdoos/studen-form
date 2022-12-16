<template>
  <div>
    <header-component/>
    <div class="container-allResult">
      <h1>Мои результаты</h1>
      <preloader-block class="preloader" v-if="showPreloader"/>
      <div v-else class="block-result">
        <ul>
          <li class="result-li" v-for="test of dataTest" :key="test.index">
            <p>{{test.test.testName}}</p>
            <p class="block-result__p">оценка за тест</p>
            <p class="block-result__rating">{{test.scoreByTest}} / 100</p>
            <button @click="showBlock(test)">{{test.visible ? 'Скрыть результаты' : 'Показать результаты'}}</button>

            <ul class="block-result__ul" v-if="test.visible">
              <li v-for="item of test.answerResults" :key="item.index">
                <p class="block-result__text">{{item.question.questionValue}}</p>
                <p class="block-result__questions">{{item.score}} / {{item.question.maxScores}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "StudentResultPage",
  components: {PreloaderBlock, HeaderComponent},
  data () {
    return {
      dataTest: [],
      showPreloader: true,
      studentResult: [
        {
          title: 'Проектирование информационных систем',
          visible: false,
          textBtn: 'Показать результаты',
          averageRating: '5',
          questions: [
            {name: 'Вопрос 1', questionRating: 1},
            {name: 'Вопрос 2', questionRating: 2},
            {name: 'Вопрос 3', questionRating: 1},
            {name: 'Вопрос 4', questionRating: 0},
            {name: 'Вопрос 5', questionRating: 2},
            {name: 'Вопрос 6', questionRating: 1},
            {name: 'Вопрос 7', questionRating: 0},
            {name: 'Вопрос 8', questionRating: 1},
            {name: 'Вопрос 9', questionRating: 2},
            {name: 'Вопрос 10', questionRating: 0},
          ]
        },
        {title: 'Компьютерная математика',
          visible: false,
          textBtn: 'Показать результаты',
          averageRating: '4',
          questions: [
            {name: 'Вопрос 1', questionRating: 1},
            {name: 'Вопрос 2', questionRating: 2},
            {name: 'Вопрос 3', questionRating: 1},
            {name: 'Вопрос 4', questionRating: 0},
            {name: 'Вопрос 5', questionRating: 2},
            {name: 'Вопрос 6', questionRating: 1},
            {name: 'Вопрос 7', questionRating: 0},
            {name: 'Вопрос 8', questionRating: 1},
            {name: 'Вопрос 9', questionRating: 2},
            {name: 'Вопрос 10', questionRating: 0},
          ]
        },
        {title: 'Теория информации, данные, знания',
          visible: false,
          textBtn: 'Показать результаты',
          averageRating: '3',
          questions: [
            {name: 'Вопрос 1', questionRating: 1},
            {name: 'Вопрос 2', questionRating: 2},
            {name: 'Вопрос 3', questionRating: 1},
            {name: 'Вопрос 4', questionRating: 0},
            {name: 'Вопрос 5', questionRating: 2},
            {name: 'Вопрос 6', questionRating: 1},
            {name: 'Вопрос 7', questionRating: 0},
            {name: 'Вопрос 8', questionRating: 1},
            {name: 'Вопрос 9', questionRating: 2},
            {name: 'Вопрос 10', questionRating: 0},
          ]
        },
      ],

    }
  },
  methods: {
    showBlock(test) {
      if (test.visible === false) {
        return test.visible = true

      }
      if (test.visible === true) {
        return test.visible = false
      }
    },
    //Скрыть прелоадер
    closePreloder() {
      setTimeout(() => (
          this.showPreloader = false
      ), 700);
    }
  },
  async created() {
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    await fetch(`/result/myself?sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => { this.dataTest = data;});
    for(let item of this.dataTest) {
      item.visible = false
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
.block-result{
  display: flex;
  justify-content: center;
  width: 85%;
  margin: auto;
}
ul{
  height: inherit;
  padding: 0;
  text-align: left;
}
.result-li{
  justify-content: end;
}
li{
  list-style-type: none;
  margin-bottom: 16px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li p{
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
}
p{
  margin: 0;
  font-weight: 600;
  font-size: 22px;
}
.block-result__p{
  margin: 0 34px;
  font-size: 20px;
}
.block-result__questions,
.block-result__rating{
  color: #26AF11;
}
button{
  width: 178px;
  height: 25px;
  background: #7BAE73;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  color: #FFFEFB;
  border: 2px solid #7BAE73;
  margin-left: 54px;
}
button:hover{
  color: #26AF11;
  border: 2px solid #26AF11;
  background: #FFFEFB;
}
.block-result__ul{
  width: 100%;
  margin-top: 27px;
}
.block-result__ul li{
  font-size: 19px;
}
.block-result__questions{
  margin-left: 100px;
  font-size: 20px;
}
.preloader{
  margin-top: 90px;
}
.block-result__text{
  font-size: 19px;
  display: flex;
  width: 80%;
  justify-content: right;
  text-align: right;
}
</style>
