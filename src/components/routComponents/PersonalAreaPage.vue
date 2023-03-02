<template>
  <div>
    <header-component/>
    <preloader-block class="preloader" v-if="showPreloader"/>
    <div v-else class="container-area">
      <h1>Добро пожаловать</h1>
      <div class="line"></div>
      <div class="content-area">
        <div class="photo"><img :src="dataUser.user.imageUrl"></div>
        <div class="dateUser">
          <div class="date">
            <p>Фамилия:</p>
            <p class="date__margin">{{dataUser.user.lastName}}</p>
          </div>
          <div class="date">
            <p>Имя:</p>
            <p class="date__margin">{{dataUser.user.firstName}}</p>
          </div>
          <div class="date">
            <p>Отчество:</p>
            <p class="date__margin">{{dataUser.user.midletName}}</p>
          </div>
          <div class="date">
            <p>Роль:</p>
            <p class="date__margin">{{roleRev}}</p>
          </div>
          <div class="date">
            <p>Пол:</p>
            <p class="date__margin">{{dataUser.user.gender}}</p>
          </div>
          <div class="date">
            <p>Возраст:</p>
            <p class="date__margin">{{dataUser.user.age}}</p>
          </div>
          <div class="date">
            <p>Вуз:</p>
            <p class="date__margin">{{dataUser.educationalInstitution}}</p>
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
  name: "PersonalAreaPAge",
  components: {PreloaderBlock, HeaderComponent},
  data () {
    return {
      dataUser: [],
      sessionId: '',
      showPreloader: true
    }
  },
  async created() {
    this.sessionId = await JSON.parse(localStorage.getItem('sessionId'))
    await fetch(`auth/sessionId?sessionId=${this.sessionId}`, {
        method: "POST",
            headers: {
          'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {return this.dataUser = data});
    this.showPreloader = false
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    roleRev () {
      if (this.dataUser.user.role === 'student') {
        return 'Студент'
      }
      if (this.dataUser.user.role === 'teacher') {
        return 'Преподаватель'
      }
    }
  }

}
</script>

<style scoped>
.container-area{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  color: #26AF11;
  text-align: left;
  margin: 41px 0 31px;
}
.line{
  height: 1px;
  background: #49485E;
  margin-bottom: 32px;
}
.content-area{
  display: flex;
}
.photo{
  width: 249px;
  height: 300px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25), 0px 10px 6px rgba(0, 0, 0, 0.25);
}
.photo img{
  height: 100%;
}
.dateUser{
  margin-left: 121px;
}
.date{
  display: flex;
}
.date__margin{
  margin-left: 10px;
}
p{
  font-weight: 600;
  font-size: 20px;
  line-height: 36px;
  color: #49485E;
  margin: 0 0 12px;
}
.preloader{
  margin-top: 180px;
}
</style>
