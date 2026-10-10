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
    background: rgba(22, 34, 55, 0.5);
    position: fixed;
    display: flex;
    padding: 16px;
}
.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    width: min(100%, 420px);
    padding: 24px;
    box-shadow: 0 18px 50px rgba(16, 30, 54, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
