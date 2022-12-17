<template>
  <div>
    <header-component/>
    <div class="container-analytics">
      <h1>Аналитика</h1>
      <div class="line"></div>

      <h2>1. Процент студентов, сдавших тест на «5», «4», «3», «2»</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button @click="visible.value1 = !visible.value1">{{visible.value1 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <img v-if="visible.value1" src="../../../assets/ocenki.jpg">

      <h2>2. Процент правильных ответов группы на вопросы теста</h2>
      <div class="analytic-block--options" style="margin-bottom: 20px;">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button @click="visible.value2 = !visible.value2">{{visible.value2 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <img v-if="visible.value2" src="../../../assets/gistogramma.jpg">

      <h2>3. Абсолютная успеваемость по каждой группе</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >Теория информации, данные, знания</option>
        </select>
        <button @click="visible.value3 = !visible.value3">{{visible.value3 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value3" class="text-analitics">Абсолютная успеваемость группы Д-Э 121 равна <span>72,5</span></p>

      <h2>4. Качественная успеваемость по каждой группе</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >Теория информации, данные, знания</option>
        </select>
        <button @click="visible.value4 = !visible.value4">{{visible.value4 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value4" class="text-analitics">Качественная успеваемость группы Д-Э 121 равна <span>50.0</span></p>

      <h2>5. Мода группы:</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button>Показать</button>
      </div>

      <h2>6.	Медиана группы:</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >Алгоритмы и структуры данных</option>
        </select>
        <button @click="visible.value6 = !visible.value6">{{visible.value6 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value6" class="text-analitics">Медиана группы Д-Э 121 равна <span>3.5</span></p>

      <h2>7. Средний балл для каждой группы.</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >Проектирование информационных систем</option>
        </select>
        <button @click="visible.value7 = !visible.value7">{{visible.value7 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value7" class="text-analitics">Средний балл группы Д-Э 121 равен <span>3.475</span></p>

      <h2>8. Размах вариации:</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >Методология и технология проектирования информационных систем</option>
        </select>
        <button @click="visible.value8 = !visible.value8">{{visible.value8 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value8" class="text-analitics">Размах вариации для группы Д-Э 121 равен <span>3</span></p>

      <h2>9.	Дисперсия</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button>Показать</button>
      </div>

      <h2>10.	Среднеквадратическое отклонение</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button>Показать</button>
      </div>

      <h2>11.	Коэффициент вариации </h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <p>Выберите тест:</p>
        <select class="select-grade"  v-model="selectedGrade">
          <option
              v-for="(option, index) in grade"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button>Показать</button>
      </div>

      <h2>12.	Определить как по одним и тем же предметам учатся разные группы</h2>
      <div class="analytic-block--options">
        <button @click="visible.value12 = !visible.value12">{{visible.value12 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <p v-if="visible.value12" class="text-analitics"><span>Вывод: </span>группы учатся не на одинаковые оценки.
        <br>Стандартное отклонение для проверки выдвинутой гипотезы: <span>0.789470638395684</span></p>

      <h2>13. Сравнение средних баллов по годам по каждому студенту</h2>
      <div class="analytic-block--options">
        <p>Выберите группу:</p>
        <select class="select-group"  v-model="selectedGroup">
          <option
              v-for="(option, index) in group"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
        <button @click="visible.value13 = !visible.value13">{{visible.value13 ? 'Скрыть' : 'Показать'}}</button>
      </div>
      <img v-if="visible.value13" src="../../../assets/sravnenie-po-godam.jpg">

    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
export default {
  name: "AnalyticsDataPage",
  components: {HeaderComponent},
  data() {
    return {
      visible: {
        value1: false,
        value2: false,
        value3: false,
        value4: false,
        value6: false,
        value7: false,
        value8: false,
        value12: false,
        value13: false,
      }
      ,
      group: [
        { text: 'Д-Э 121', value: '121' },
        { text: 'Д-Э 122', value: '122' },
        { text: 'Д-Э 123', value: '123' },
        { text: 'Д-Э 124', value: '124' },
        { text: 'Д-Э 125', value: '125' },
      ],
      grade: [
        { text: 'Проектирование информационных систем', value: '5' },
        { text: 'Теория информации, данные, знания', value: '4' },
        { text: 'Компьютерная математика', value: '3' },
        { text: 'Алгоритмы и структуры данных', value: '2' },
      ],
      selectedGroup: '121',
      selectedGrade: '5'
    }
  }
}
</script>

<style scoped>
.container-analytics{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
.line{
  height: 1px;
  background: #49485E;
  margin-bottom: 32px;
}
h2{
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #3F8035;
  margin-top: 35px;
}
.analytic-block--options{
  display: flex;
  justify-content: center;
}
.analytic-block--options:last-child{
  margin-bottom: 60px;
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
