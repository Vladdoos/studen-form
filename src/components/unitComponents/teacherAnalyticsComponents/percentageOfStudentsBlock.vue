<template>
  <h2>1. Процент студентов, сдавших тест на «5», «4», «3», «2»</h2>
  <div class="analytic-block--options">
    <p>Выберите группу:</p>
    <select @click="hidePie()" class="select-group" v-model="groups">
      <option
          v-for="(option, index) in dataGroup"
          :value="option.groupName"
          :key="index"
      >{{option.groupName}}</option>
    </select>
    <p>Выберите тест:</p>
    <select @click="hidePie()" class="select-grade" v-model="titleTest">
      <option
          v-for="(option, index) in dataResult"
          :value="option.test.testName"
          :key="index"
      >{{option.test.testName}}</option>
    </select>
    <button @click="getPie()">{{visible ? 'Скрыть' : 'Показать'}}</button>
  </div>
    <Pie v-if="visible" class="pie"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />

</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: "percentageOfStudentsBlock",
  components: { Pie },
  props: {
    dataGroup: Object,
    dataResult: Object
  },
  data () {
    return {
      visible: false,
      result: null,
      groups: null,
      titleTest: null,
      chartData: null,
      chartOptions: {
        responsive: false
      }
    }
  },
  methods: {
    // Поиск оценок группы и теста по заданным параметрам
    searchRating () {
      return this.dataResult
          .find(item => item.test.testName === this.titleTest).studentGroups
          .find(a => a.groupName === this.groups).students
          .filter(a => a.result)
          .map(a => a.result.scoreByTest)
    },
    getPie () {
      this.visible = !this.visible
      let arr = this.dataResult.find(item => item.test.testName === this.titleTest)
      let otl = this.searchRating().filter(a => a >= (arr.maxScoreByTest * 0.9)).length
      let hor = this.searchRating().filter(a => a >= (arr.maxScoreByTest * 0.75) && a < (arr.maxScoreByTest * 0.9)).length
      let ud = this.searchRating().filter(a => a >= (arr.maxScoreByTest * 0.6) && a < (arr.maxScoreByTest * 0.75)).length
      let neud = this.searchRating().filter(a => a < arr.maxScoreByTest * 0.6).length
      this.chartData = {
        labels: ['2', '3', '4', '5'],
        datasets: [{
          backgroundColor: ['#0124c7', '#ff7300', '#49ff01', '#ec0216'],
          data: [neud, ud, hor, otl]
        }]
      }
    },
    // Скрыть прогресс
    hidePie() {
      this.visible = false; this.resultMedian = null
    }
  },
  created() {
      this.groups = this.dataGroup[0].groupName
      this.titleTest = this.dataResult[0].test.testName
  }
}
</script>

<style scoped>
.analytic-block--options{
  display: flex;
  justify-content: center;
}
.analytic-block--options:last-child{
  margin-bottom: 60px;
}
h2{
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #3F8035;
  margin-top: 35px;
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
  height: 36px;
  margin: 6px 44px 0 27px;
}
.select-group{
  width: 147px;
}
p{
  font-weight: 600;
  font-size: 16px;
  color: #49485E;
}
select:active, select:focus{
  outline:none
}
button{
  padding: 9px 55px;
  background: #7BAE73;
  border-radius: 14px;
  border: 2px solid #7BAE73;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #FFFEFB;
  height: 38px;
  margin-top: 7px;
}
button:hover{
  background: #61e431;
}
.select-grade{
  width: 190px;
}
.pie{
  width: 400px;
  height: 400px;
  margin: 15px auto;
}

</style>
