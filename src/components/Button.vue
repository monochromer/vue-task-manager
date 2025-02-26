<template>
  <button class="button" type="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid var(--color-border-primary);
    text-align: center;
    font: inherit;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-light-contrast);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: var(--color-light-fade);
    }
  }
</style>