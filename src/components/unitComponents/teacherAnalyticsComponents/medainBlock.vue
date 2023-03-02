<template>
  <h2>6.	Медиана группы:</h2>
  <div class="analytic-block--options">
    <p>Выберите группу:</p>
    <select @click="hideMedian()" class="select-group" v-model="groups">
      <option
          v-for="(option, index) in dataGroup"
          :value="option.groupName"
          :key="index"
      >{{option.groupName}}</option>
    </select>
    <p>Выберите тест:</p>
    <select @click="hideMedian()" class="select-grade" v-model="titleTest">
      <option
          v-for="(option, index) in dataResult"
          :value="option.test.testName"
          :key="index"
      >{{option.test.testName}}</option>
    </select>

    <button @click="showMedian()">{{visible ? 'Скрыть' : 'Показать'}}</button>
  </div>
  <transition name="fade">
    <p v-if="visible" class="text-analitics">Медиана группы {{groups}} равна <span>{{resultMedian}}</span></p>
  </transition>
</template>

<script>
export default {
  name: "medainBlock",
  props: {
    dataGroup: Object,
    dataResult: Object
  },
  data () {
    return {
      visible: false,
      resultMedian: null,
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
    // Медиана группы
    showMedian() {
      if (this.resultMedian === null) {
        let medians = arr => {
          const mid = Math.floor(arr.length / 2),
              nums = [...arr].sort((a, b) => a - b);
          this.resultMedian = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
          if (isNaN(this.resultMedian)) {
            this.resultMedian = 0
          }
        };
        medians(this.searchRating())
      }
      this.visible = !this.visible
    },
    //Скрыть медиану
    hideMedian() {
      this.visible = false; this.resultMedian = null
    },
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
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
