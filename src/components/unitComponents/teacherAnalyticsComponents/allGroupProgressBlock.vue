<template>
  <h2>12.	Определить как по одним и тем же предметам учатся разные группы</h2>
  <div class="analytic-block--options">
    <button @click="showResult()">{{visible ? 'Скрыть' : 'Показать'}}</button>
  </div>
  <p v-if="visible" class="text-analitics"><span>Вывод: </span>{{text}}.
    <br>Стандартное отклонение для проверки выдвинутой гипотезы: <span>{{result}}</span></p>

</template>

<script>
export default {
  name: "allGroupProgressBlock",
  props: {
    dataGroup: Object,
    dataResult: Object
  },
  data () {
    return {
      visible: false,
      result: null,
      text: ''
    }
  },
  methods: {
    // Поиск оценок всех групп за все тесты
    searchRating () {
      let arr = []
      for (let item of this.dataResult) {
        let max = item.maxScoreByTest
        let scores = item.studentGroups.map(b => b.students.map(c => c.result?.scoreByTest)).join().split(',').map(a => Number(a)).filter(a => a !== 0)
        for (let score of scores) {
          if (score >= max * 0.9) {
            arr.push(5)
          }
          if (score >= max * 0.75 && score < max * 0.9) {
            arr.push(4)
          }
          if (score >= max * 0.6 && score < max * 0.75) {
            arr.push(3)
          }
          if (score < max * 0.6) {
            arr.push(2)
          }
        }
      }
      return arr
    },

    // Вычесление дисперсии
    getDispersion () {
      let findVariance = (arr = []) => {
        if(!arr.length){
          return 0;
        }
        let sum = arr.reduce((acc, val) => acc + val)
        let { length: num } = arr
        let median = sum / num
        let variance = 0;
        arr.forEach(num => {
          variance += ((num - median) * (num - median))
        })
        variance /= num
        this.result = variance
      }
      findVariance(this.searchRating())
    },
    showResult() {
      this.getDispersion()
      this.visible = !this.visible
      // Среднеквадратическое отклонение
      this.result = Math.sqrt(this.result)
      if(this.result > 0.25) {
        this.text = 'группы учатся не на одинаковые оценки'
      }
      if(this.result < 0.25) {
        this.text = 'группы учатся на одинаковые оценки'
      }
    },

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
</style>
