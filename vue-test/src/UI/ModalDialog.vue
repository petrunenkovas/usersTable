<template>
<div @click="hideDialog" class="dialog">
  <div @click.stop class="dialog__content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'modal-dialog',
  mounted () {
    document.addEventListener('keydown', this.escHideDialog)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.escHideDialog)
  },
  methods: {
    hideDialog () {
      this.$emit('close')
    },
    escHideDialog (e) {
      if (e.key === 'Escape') {
        this.hideDialog()
      }
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
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    background: white;
    border: 1px solid black;
    min-height: 50px;
    min-width: 350px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
