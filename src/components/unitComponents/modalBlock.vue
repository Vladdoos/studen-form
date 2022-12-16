<template>
  <div :class="{'modal-visible': isShowModal}" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Тест успешно добавлен!</h3>
          <a @click="closeModal" class="close">×</a>
        </div>
        <div class="modal-body">
          <button @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowModal: Boolean
  },
  name: 'modalBlock',
  methods: {
    // Закрытие модального окна
    closeModal () {
      this.$emit('getOpenModal', false)
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  opacity: 0;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
  pointer-events: none;
}
.modal-visible {
  opacity: 1;
  pointer-events: auto;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 200px auto;
  }
}
.modal-content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: .3rem;
  outline: 0;
}
@media (min-width: 768px) {
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
}
.modal-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 15px;
}
.modal-title {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
}
.close {
  float: right;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  text-decoration: none;
}
.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: .75;
}
.modal-body {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 15px;
  overflow: auto;
}
button{
  width: 121px;
  height: 36px;
  background: #7BAE73;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  border: #FFFEFB;
  padding: 10px;
  cursor: pointer;
}
button:hover{
  background: #7BAE60;
}
</style>
