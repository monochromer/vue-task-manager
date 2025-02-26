<script setup lang="ts">
  import IconsUrl from '@/assets/icons.svg?no-inline'

  export type IconsSet =
    | 'plus'
    | 'cross'
    | 'check'
    | 'dots'
    | 'edit'
    | 'delete'

  defineProps<{
    symbol: IconsSet
  }>()
</script>

<template>
  <svg class="icon" width="1em" height="1em">
    <use :href="`${IconsUrl}#${symbol}`"></use>
  </svg>
</template>

<style scoped>
  .icon {
    display: inline-block;
    width: 20px;
    height: auto;
    aspect-ratio: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    fill: none;
    stroke: currentColor;
  }
</style>