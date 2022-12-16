<template>
<div class="container-login">

  <div class="form">
    <h1>Вход</h1>
    <p class="log">Логин</p>
    <input v-model="userlogin">
    <p class="password">Пароль</p>
    <input type="password" v-model="userPassword">
    <p v-if="errorAuth" class="form-p">Неверный логин или пароль</p>
    <router-link class="link" :to="{name: 'RegistrationPage'}">Зарегистрироваться</router-link>
    <div class="container-btn">
        <button @click="auth()">Войти</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LoginForm",
  data () {
    return {
      userlogin: '',
      userPassword: '',
      errorAuth: false
    }
  },
  methods: {
    auth() {
      fetch("auth/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.userlogin,
          pass: this.userPassword
        })
      })
          .then(response => response.json())
          .then(data => {
            let parsedSessionId = JSON.stringify(data.user.sessionId)
            localStorage.setItem('sessionId', parsedSessionId)
            let parsedRole = JSON.stringify(data.user.role)
            localStorage.setItem('role', parsedRole)
            this.userlogin = ''
            this.userPassword = ''
            window.location = '/personalArea';
          })
          .catch(error => {
            console.log(error);
            return this.errorAuth = true
          });
    },
  },

}
</script>

<style scoped>
.container-btn,
.container-login{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.container-login{
  margin-top: 5%;
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
  padding: 22px 24px 90px;
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
.password:after,
.log:after{
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FF8484;
  position: absolute;
}
.password:after{
  top: 0;
  left: 46px;
}
.log:after{
  top: 0;
  left: 37px;
}
a{
  margin: 24px 0 57px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #234CDC;
  text-decoration: none;
}

button{
  padding: 12px 110px;
  background: #7BAE73;
  border-radius: 14px;
  border: 2px solid #7BAE73;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #FFFEFB;
}
.form-p{
  color: red;
}
</style>
