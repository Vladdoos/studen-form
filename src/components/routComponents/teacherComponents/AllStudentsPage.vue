<template>
  <div>
    <header-component/>
    <div class="container-allStudent">
      <h1>Список групп</h1>
      <preloader-block v-if="showPreloader"/>
      <ul v-else class="block-group">
        <li
            v-for="item of dataGroup"
            :key="item.index"
        >
          {{item.groupName}}
          <div class="block-i" @click="showList(item)">
            <i class="arrow down" :class="{up: item.visible}" ></i>
          </div>
          <ul class="block-list" v-if="item.visible">
            <li v-for="list of item.students" :key="list.index">{{list.user.lastName}} {{list.user.firstName}} {{list.user.midletName}}</li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "AllStudentsPage",
  components: {PreloaderBlock, HeaderComponent},
  data () {
    return {
      dataUser: [],
      dataGroup: [],
      showPreloader: true
    }
  },
  methods: {
    showList(item) {
      if (item.visible === false) {
        return item.visible = true
      }
      if (item.visible === true) {
        return item.visible = false
      }
    },
  },
  async created() {
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    await fetch(`auth/sessionId?sessionId=${this.sessionId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataUser = data});
    await fetch(`student/group/byTeacherId?teacherId=${this.dataUser.id}&sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataGroup = data});
    for(let item of this.dataGroup) {
      item.visible = false
    }
    this.showPreloader = false
  },
}
</script>

<style scoped>
.container-allStudent{
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
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin-bottom: 16px;
  position: relative;
}
i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin: 7px;

}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.block-group{
  margin: 0 0 0 40%;
  cursor: pointer;
}
.block-list{
  margin-left: 40px;
  cursor: default;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  margin: 3px 3px 3px 8px;
}
.block-i{
  position: absolute;
  top: 2px;
  padding-left: 88px;
}
</style>
