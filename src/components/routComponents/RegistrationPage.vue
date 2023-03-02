<template>
  <div class="registration-login">

    <div class="form">
      <h1>Регистрация</h1>
      <p class="log">Логин</p>
      <input
          v-model="user.login"
          placeholder="Введите логин"
          :class="{ 'inp-error': this.error.login}"
      >
      <p class="error-text" v-if="this.error.login">Поле является обязательным</p>

      <p class="password">Пароль</p>
      <input
          v-model="user.password"
          placeholder="Введите пароль"
          :class="{ 'inp-error': this.error.password}"
          >
      <p class="error-text" v-if="this.error.password">Поле является обязательным</p>

      <p class="user-name">Имя</p>
      <input
          v-model="user.name"
          placeholder="Введите имя"
          :class="{ 'inp-error': this.error.name}"
      >
      <p class="error-text" v-if="this.error.name">Поле является обязательным</p>

      <p class="user-surname">Фамилия</p>
      <input
          v-model="user.surname"
          placeholder="Введите фамилию"
          :class="{ 'inp-error': this.error.surname}"
      >
      <p class="error-text" v-if="this.error.surname">Поле является обязательным</p>

      <p class="user-surname">Отчество</p>
      <input
          v-model="user.midletName"
          placeholder="Введите отчество"
          :class="{ 'inp-error': this.error.midletName}"
      >
      <p class="error-text" v-if="this.error.midletName">Поле является обязательным</p>

      <p class="user-age">Возраст</p>
      <input
          v-model="user.age"
          placeholder="Введите ваш возраст"
          :class="{ 'inp-error': this.error.age}"
      >
      <p class="error-text" v-if="this.error.age">Поле является обязательным и должно быть числом</p>

      <p class="user-name">Пол</p>
      <div class="block-radio">
        <div class="" v-for="gender of genders" :key="gender.index">
          <input :id="gender.text" class="radio" name="radio" type="radio" :value="gender.text" v-model="user.gender" checked>
          <label :for="gender.text">{{gender.text}}</label>
       </div>
      </div>
      <p class="user-link">Ссылка на изображение</p>
      <input
          v-model="user.imageUrl"
          placeholder="Вставьте ссылку на изображение"
          :class="{ 'inp-error': this.error.imageUrl}"
      >
      <p class="error-text" v-if="this.error.imageUrl">Поле является обязательным</p>

      <p class="block-institute">Институт</p>
      <input
          v-model="user.educationalInstitution"
          placeholder="Введите название института"
          :class="{ 'inp-error': this.error.educationalInstitution}"
      >
      <p class="error-text" v-if="this.error.imageUrl">Поле является обязательным</p>

      <p class="select">Студент или преподаватель</p>
      <div class="block-select">
        <select v-model="selectedJob">
          <option
              v-for="(option, index) in options"
              :value="option.value"
              :key="index"
          >{{option.text}}</option>
        </select>
      </div>

      <div v-if="selectedJob === 'student'">
        <p class="block-group">Идентификатор группы</p>
          <div class="block-select">
            <input
                v-model="user.group"
                placeholder="Введите идентификатор группы"
                :class="{ 'inp-error': this.error.group}"
            >
            <p class="error-text" v-if="this.error.group">Поле является обязательным</p>
          </div>
      </div>
      <p v-if="visibleSuccess" class="text-Success">Регистрация прошла успешно, можете войти в свой личный кабинет</p>
      <router-link class="link" :to="{name: 'LoginForm'}">Войти</router-link>
      <div class="container-btn">
        <button @click="checkValidation()">Регистрация</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationPage",
  data () {
    return {
      visibleSuccess: false,
      user: {
        name: '',
        surname: '',
        midletName: '',
        gender: 'Женский',
        imageUrl: '',
        age: '',
        role: '',
        login: '',
        password: '',
        group: '',
        educationalInstitution: '',
      },
      groupId: '',
      error: {
        name: false,
        surname: false,
        midletName: false,
        imageUrl: false,
        age: false,
        login: false,
        password: false,
        educationalInstitution: false,
        group: false
      },
      selectedJob: 'teacher',
      selectedGroup: '121',
      genders: [
        {text: 'Мужской'},
        {text: 'Женский'}
      ],
      options: [
        { text: 'Студент', value: 'student' },
        { text: 'Преподаватель', value: 'teacher' }
      ],
    }
  },
  methods: {
    //Валидация регистрации
    checkValidation () {
      this.user.age = Number(this.user.age)
      if (!this.user.name) {
        this.error.name = true
      }
      if (!this.user.surname) {
        this.error.surname = true
      }
      if (!this.user.midletName) {
        this.error.midletName = true
      }
      if (!this.user.login) {
        this.error.login = true
      }
      if (!this.user.password) {
        this.error.password = true
      }
      if (Number(this.user.age) === false || !this.user.age) {
        this.error.age = true
        this.user.age = ''
      }
      if (!this.user.imageUrl) {
        this.error.imageUrl = true
      }
      if (!this.user.educationalInstitution) {
        this.error.educationalInstitution = true
      }
      if (this.selectedJob === 'student') {
        if (!this.user.group) {
          this.error.group = true
          this.user.group = ''
        }
      }
      if (this.user.name && this.user.surname && this.user.midletName && this.user.login && this.user.password && this.user.imageUrl && this.user.educationalInstitution && (Number(this.user.age) === true || this.user.age)) {
        this.Registration()
      }
    },
    Registration() {
      if (this.selectedJob === 'teacher') {
        fetch("auth/teacher/registration", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            educationalInstitution: this.user.educationalInstitution,
            user: {
              lastName: this.user.surname,
              firstName: this.user.name,
              midletName: this.user.midletName,
              login: this.user.login,
              pass: this.user.password,
              gender: this.user.gender,
              imageUrl: this.user.imageUrl,
              age: this.user.age,
              role: this.selectedJob
            }
          })
        })
            .then(response => response.json())
            .then(data => {console.log(data); this.visibleSuccess = true})
            .catch(error => {
              console.log(error);
              });
      } else {
        fetch("auth/student/registration", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            educationalInstitution: this.user.educationalInstitution,
            groupId: this.user.group,
            user: {
              lastName: this.user.surname,
              firstName: this.user.name,
              midletName: this.user.midletName,
              login: this.user.login,
              pass: this.user.password,
              gender: this.user.gender,
              imageUrl: this.user.imageUrl,
              age: this.user.age,
              role: this.selectedJob
            }
          })
        })
            .then(response => response.json())
            .then(data => {console.log(data); this.visibleSuccess = true; window.location = '/auth'})
            .catch(error => {
              console.log(error);
            });
      }
    }
  },
}
</script>

<style scoped>
.container-btn,
.registration-login{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.registration-login{
  margin-top: 3%;
}
.form{
  background: white;
  display: flex;
  flex-direction: column;
  width: 450px;
  height: auto;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 22px 24px 40px;
}
h1{
  font-weight: 400;
  font-size: 32px;
  line-height: 35px;
  color: #26AF11;
}
input{
  height: 36px;
  left: 835px;
  top: 286px;
  background: #FFFEFB;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid whitesmoke;
  padding-left: 16px;
  width: 96%;
}
:active, :hover, :focus {
  outline: 0;
  outline-offset: 0;
}
p{
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #49485E;
  margin: 24px 0 0 16px;
  position: relative;
}
.block-group:after,
.select:after,
.user-name:after,
.user-surname:after,
.password:after,
.user-age:after,
.user-link:after,
.block-institute:after,
.log:after{
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FF8484;
  position: absolute;
}
.user-link:after{
  top: 0;
  left: 154px;
}
.user-surname:after{
  top: 0;
  left: 58px;
}
.block-institute:after{
  top: 0;
  left: 60px;
}
.password:after{
  top: 0;
  left: 46px;
}
.block-group:after {
  top: 0;
  left: 148px;
}
.user-age:after{
  top: 0;
  left: 52px;
}
.log:after{
  top: 0;
  left: 37px;
}
.user-name:after{
  top: 0;
  left: 31px;
}
.select:after{
  top: 0;
  left: 177px;
}
a{
  margin: 24px 0 30px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #234CDC;
  text-decoration: none;
}

button{
  padding: 12px 80px;
  background: #7BAE73;
  border-radius: 14px;
  border: 2px solid #7BAE73;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #FFFEFB;
  cursor: pointer;
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
  width: 100%;
}

select:active, select:focus{
  outline:none
}
.block-radio{
  position: relative;
  display: flex;
}
.block-radio div{
  margin: 15px 0px 10px 20px;
}
.radio {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}
.radio + label {
  position: relative;
  padding: 3px 0 0 40px;
  cursor: pointer;
}
.radio + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 13px;
  background: #FFFFFF;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2);
  transition: .2s;
  border: 1px solid #BDBDBD;
}
.radio + label:after {
  content: '';
  position: absolute;
  top: 8px;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  transition: .2s;
}

.radio:checked + label:after {
  background: #26AF11;
}
label{
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #49485E;
}
.inp-error{
  border: 1px solid #FF8484;
}
.error-text{
  margin: 0 0 0 20px;
  color: #FF8484;
  font-size: 11px;
}
.text-Success{
  color: #26AF11;
}
</style>
