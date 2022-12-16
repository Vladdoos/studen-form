<template>
  <header-component/>
  <div class="container-group">
    <h1 style="margin-bottom: 0">Моя группа</h1>
    <preloader-block class="preloader" v-if="showPreloader"/>
    <h1 v-if="!showPreloader" style="margin-top: 0">{{dataGroup.groupName}}</h1>
    <div v-if="!showPreloader" class="block-group">
      <div class="block-form" v-for="user in dataGroup.students" :key="user.index">
        <div class="photo"><img :src="user.user.imageUrl"></div>
        <div class="form-text">
          <div class="date">
            <p>Фамилия:</p>
            <p class="date__margin">{{user.user.lastName}}</p>
          </div>
          <div class="date">
            <p>Имя:</p>
            <p class="date__margin">{{user.user.firstName}}</p>
          </div>
          <div class="date">
            <p>Отчество:</p>
            <p class="date__margin">{{user.user.midletName}}</p>
          </div>
          <div class="date">
            <p>Пол:</p>
            <p class="date__margin">{{user.user.gender}}</p>
          </div>
          <div class="date">
            <p>Возраст:</p>
            <p class="date__margin">{{user.user.age}}</p>
          </div>
          <div class="date">
            <p>Вуз:</p>
            <p class="date__margin">{{user.educationalInstitution}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "StudentGroupPage",
  components: {PreloaderBlock, HeaderComponent},
  data() {
    return {
      dataUser:[],
      dataGroup: [],
      showPreloader: true
    }
  },
  methods: {
    closePreloder() {
      setTimeout(() => (
          this.showPreloader = false
      ), 700);
    }
  },
  mounted() {
    this.closePreloder()
  },
  async created() {
    // получаем sessionId из localStorage
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
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
    await fetch(`/student/group?sessionId=${this.sessionId}&groupId=${this.dataUser.groupId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataGroup = data});
  },
}
</script>

<style scoped>
.container-group{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
.block-group{
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.block-form{
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 48%;
  height: 295px;
  display: flex;
  margin: 10px 10px;
}
.date{
  display: flex;
}
.date__margin{
  margin-left: 10px;
}
p{
  font-weight: 600;
  font-size: 18px;
  line-height: 36px;
  color: #49485E;
  margin: 0 0 5px;
}
.photo{
  width: 249px;
  height: 300px;
  margin: auto 0;
}
.photo img{
  height: 80%;
  left: 122px;
  top: 260px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25), 0px 10px 6px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  margin-top: 20px;
}
.form-text{
  padding-top: 15px;
}
.preloader{
  margin-top: 90px;
}
</style>
