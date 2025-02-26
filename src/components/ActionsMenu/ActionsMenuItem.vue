<script setup lang="ts">
  import Icon, { type IconsSet } from '@/components/Icon.vue'
  import type { ActionName } from './types'

  const props = defineProps<{
    actionName: ActionName
    icon?: IconsSet
    text: string
  }>()

  const emit = defineEmits<{
    'click': [actionName: ActionName]
  }>()

  const onClick = () => {
    emit('click', props.actionName)
  }
</script>

<template>
  <li class="actions-menu-item">
    <button class="actions-menu-item__button" type="button" @click="onClick">
      <Icon v-if="props.icon" :symbol="props.icon" class="actions-menu-item__icon"></Icon>
      {{ text }}
    </button>
  </li>
</template>

<style scoped>
  .actions-menu-item {}

  .actions-menu-item__button {
    box-sizing: border-box;
    border: 0;
    padding: 5px 10px;
    width: 100%;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font: unset;
    background: none;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: var(--color-action-light);
    }
  }

  .actions-menu-item__icon {
    color: var(--color-text-fade);
  }
</style>