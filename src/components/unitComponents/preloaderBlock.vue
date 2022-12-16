<template>
  <div class="preloader">
    <img src="../../assets/preloader.gif" alt="preloader">
  </div>
</template>

<script>
export default {
  name: "preloaderBlock"
}
</script>

<style scoped>
.preloader {
  top: 10%;
  left: 1%;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  background: #ffffff;
  flex-direction: column;
}
@media (max-width: 1000px) {
  .preloader{
    top: 1%
  }
}
</style>
