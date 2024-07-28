<template>
    <div :style="spinnerStyle" class="spinner"></div>
</template>
  
<script scoped>
export default {
props: {
    height: {
    type: String,
    default: '40px'
    },
    width: {
    type: String,
    default: '40px'
    },
    borderColor: {
    type: String,
    default: '#1f273e'
    },
    borderWidth: {
    type: String,
    default: '4px'
    }
},
computed: {
    spinnerStyle() {
    return {
        border: `${this.borderWidth} solid rgba(0, 0, 0, 0.1)`,
        borderLeftColor: this.borderColor,
        borderRadius: '50%',
        width: this.width,
        height: this.height,
        animation: 'spin 1s linear infinite'
    };
    }
}
}
</script>

<style>
@keyframes spin {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
}
</style>
