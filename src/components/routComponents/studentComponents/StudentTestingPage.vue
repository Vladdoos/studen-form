<template>
  <div>
    <header-component/>
    <div class="container-testing">
      <h1>Тестирование</h1>
      <preloader-block class="preloader" v-if="showPreloader"/>
      <div v-else class="block-tests">
        <ul>
          <li v-for="item of dataTest" :key="item.index">
            <p>{{item.testName}}</p>
            <router-link :to="{name: 'StartingTesting', query: {id: item.id}}">
              <button :disabled="item.accept" :class="{'btn-disabled': item.accept}">
                {{item.accept ? 'Тест пройден' : 'Начать тест' }}
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "StudentTestingPage",
  components: {PreloaderBlock, HeaderComponent},
  data () {
    return {
      dataTest: [],
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
  created() {
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    fetch(`/test?sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {this.dataTest = data;});
  },
}
</script>

<style scoped>
.container-testing{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
ul{
  height: inherit;
  padding: 0;
  text-align: left;
}
li{
  list-style-type: none;
  margin-bottom: 19px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li p{
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin: 0;
  width: 39%;
}
button{
  width: 147px;
  height: 25px;
  background: #7BAE73;
  border-radius: 10px;
  color: #FFFEFB;
  border: 2px solid #7BAE73;
  margin: auto 0 auto 54px;
}
button:hover{
  color: #26AF11;
  border: 2px solid #26AF11;
  background: #FFFEFB;
}
.btn-disabled,
.btn-disabled:hover{
  background: #BDBDBD;
  border-radius: 2px;
  border: 2px solid #BDBDBD;
  color: #FFFEFB;
}
.preloader{
  margin-top: 90px;
}
</style>
