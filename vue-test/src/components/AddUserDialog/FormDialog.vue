<template>
<div class="dialog" @click="hideDialog">
  <div @click.stop class="dialog__content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'form-dialog',
  methods: {
    hideDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    background: white;
    border: 1px solid black;
    min-height: 50px;
    min-width: 350px;
    padding: 2px 20px 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
