<script setup lang="ts">
import logo from '@/assets/logo.svg'
</script>

<template>
  <nav class="header">
    <a href="/">
      <img :src="logo" alt="Video Player App Home" />
    </a>
  </nav>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 16px 0;
}
</style>
