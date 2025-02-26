<template>
  <span class="visually-hidden">
    <slot></slot>
  </span>
</template>

<style scoped>
  .visually-hidden {
    position: absolute;
    margin: -1px;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
    width: 1px;
    height: 1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
  }
</style>