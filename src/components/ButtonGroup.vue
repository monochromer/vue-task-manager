<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
  .button-group {
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
</style>