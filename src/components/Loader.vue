<script setup lang="ts">
import LoaderIcon from '@/components/Icons/LoaderIcon.vue'
</script>

<template>
  <div class="loader-overlay" role="status" aria-live="polite" aria-busy="true">
    <LoaderIcon />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped lang="scss">
.loader-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.icon {
  width: 50px;
  height: 50px;
  stroke: $color-muted;
}

.spinning {
  animation: spin 1s linear infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
