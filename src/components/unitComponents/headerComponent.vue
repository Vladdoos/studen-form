<template>
  <div class="headerComponent">
    <ul>
      <li v-for="list in (showList ? listStudent : listTeacher)" :key="list.index">
        <router-link class="link" :to="{name: list.url}">{{list.value}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "headerComponent",
  data () {
    return {
      role: '',
      showList: Boolean,
      listTeacher: [
        {value: 'Личный кабинет', url: 'PersonalAreaPage'},
        {value: 'Мои студенты', url: 'AllStudentsPage'},
        {value: 'Тесты', url: 'TeacherTestsPage'},
        {value: 'Таблица результатов', url: 'ResultPage'},
        {value: 'Аналитика', url: 'AnalyticsDataPage'},
        {value: 'Выход', url: 'MainPage'},
      ],
        listStudent: [
        {value: 'Личный кабинет', url: 'PersonalAreaPage'},
        {value: 'Тестирование', url: 'StudentTestingPage'},
        {value: 'Мои результаты', url: 'StudentResultPage'},
        {value: 'Моя группа', url: 'StudentGroup'},
        {value: 'Выход', url: 'MainPage'},
      ]
    }
  },
  created() {
    this.role = JSON.parse(localStorage.getItem('role'))
    if (this.role === 'student') {
      this.showList = true
    }
    if (this.role === 'teacher') {
      this.showList = false
    }
  }
}
</script>

<style scoped>

.headerComponent{
  height: 65px;
  background: rgba(189, 189, 189, 0.9);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.25), 0 6px 10px rgba(0, 0, 0, 0.25);
  padding: 0 80px;
}
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  align-items: center;
  height: inherit;
  padding: 0;
}
a,
li{
  list-style-type: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: #FFFEFB;
  text-decoration: none;
}
.head-block li{
  margin-right: 120px;
}
</style>
