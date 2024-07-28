
<script lang="ts">
export default {
  name: "Modal",
  props: {
    showCopyIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    copyContent() {
      const modalContent = this.$el.querySelector('.modal-ul');
      if (modalContent) {
        const range = document.createRange();
        range.selectNode(modalContent);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
          try {
            document.execCommand('copy');
            alert('Content copied to clipboard');
          } catch (err) {
            alert('Failed to copy content');
          }
          selection.removeAllRanges();
        }
      }
    },
    handleButtonClick() {
      this.$emit('button-click');
    }
  }
};
</script>

<template>
  <section v-if="showModal" class="modal-overlay">
    <div class="modal">
      <span class="modal-title">
        <slot name="title">Default Title</slot>  
        <i v-if="showCopyIcon" class="material-icons" @click="copyContent">content_copy</i>
      </span>
      <ul class="modal-ul">
        <slot></slot>
      </ul>
      <button class="modal-button" @click="handleButtonClick">
        <slot name="button">Close</slot>
      </button>
    </div>
  </section>
</template>

<style>
.modal {
  padding: 1.5rem;
  width: 90%;
  max-width: 350px; 
  background-color: #FFF;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #706c6c;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 1rem;
  margin-bottom: 3rem;
}

.modal-title {
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: .5rem;
}

.modal-ul {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-button {
  background-color: #087cec;
  padding: 1rem;
  color: white;
  border-radius: 5px;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
}

.modal-overlay {
  position: fixed;
  background-color: rgba(112, 108, 108, 0.9);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
