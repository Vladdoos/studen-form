<template>
  <div class="mainPage">
    <p>Добро пожаловать на информационную платформу для обучения студентов, для того чтобы продолжить
      <router-link class="link" :to="{name: 'LoginForm'}">Войдите</router-link> или
      <router-link class="link" :to="{name: 'RegistrationPage'}">Зарегистрируйтесь</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainPage{
  padding: 0 15%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 600px;
}
p{
  font-size: 30px;
  color: green;
}
a{
  font-weight: bolder;
  color: greenyellow;
}
</style>
