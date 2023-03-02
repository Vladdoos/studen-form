<template>
  <h2>7. Средний балл для каждой группы.</h2>
  <div class="analytic-block--options">
    <p>Выберите группу:</p>
    <select class="select-group" v-model="groups" @click="hideAverageScore()">
      <option
          v-for="(option, index) in dataGroup"
          :value="option.groupName"
          :key="index"
      >{{option.groupName}}</option>
    </select>
    <p>Выберите тест:</p>
    <select class="select-grade" v-model="titleTest" @click="hideAverageScore()">
      <option
          v-for="(option, index) in dataResult"
          :value="option.test.testName"
          :key="index"
      >{{option.test.testName}}</option>
    </select>
    <button @click="getAverageScore()">{{visible ? 'Скрыть' : 'Показать'}}</button>
  </div>
  <transition name="fade">
    <p v-if="visible" class="text-analitics">Средний балл группы {{groups}} равен <span>{{result.toFixed(3)}}</span></p>
  </transition>
</template>

<script>
export default {
  name: "averageScoreBlock",
  props: {
    dataGroup: Object,
    dataResult: Object
  },
  data () {
    return {
      visible: false,
      result: null,
      groups: '',
      titleTest: ''
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
    //Вычисление средней оценки
    getAverageScore () {
      this.visible = !this.visible
       let sum = this.searchRating().reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      this.result = sum / this.searchRating().length
      if (isNaN(this.result)) this.result = 0
    },
    hideAverageScore () {
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

.text-analitics{
  font-size: 21px;
  margin: 50px auto 60px;
  color: #53760e;
  line-height: 1.5;
}
.text-analitics span{
  color: #43e70b;
}
.fade-leave-active,
.fade-enter-active{
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to,
 .fade-leave-active {
  opacity: 0;
}
</style>
