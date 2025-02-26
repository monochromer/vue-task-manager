<script setup lang="ts">
  import { computed, ref, watch, useTemplateRef, nextTick } from 'vue';
  import Icon from '@/components/Icon.vue'
  import VisuallyHidden from '@/components/VisuallyHidden.vue'
  import ActionsMenuItem from './ActionsMenuItem.vue';
  import type { ActionName } from './types'

  const emit = defineEmits<{
    'action': [action: ActionName]
  }>()

  const triggerRef = useTemplateRef('trigger-ref')

  const dropdownRef = useTemplateRef('dropdown-ref')

  const isOpen = ref(false);

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const triggerBoundingBox = computed(() => {
    return isOpen.value ? triggerRef.value?.getBoundingClientRect() : null
  })

  const dropdownBoundingBox = computed(() => {
    return isOpen.value ? dropdownRef.value?.getBoundingClientRect() : null
  })

  const isAlternatePosition = ref(false)

  watch(isOpen, async (value) => {
    await nextTick()
    isAlternatePosition.value = false
    if (!value) {
      return
    }
    if (!dropdownRef.value) {
      return
    }
    isAlternatePosition.value = dropdownRef.value.getBoundingClientRect().right > window.innerWidth
  }, {
    flush: 'post'
  })

  const inlineStyles = computed(() => {
    const triggerBox = triggerBoundingBox.value
    const dropdownBox = dropdownBoundingBox.value
    const isAlternate = isAlternatePosition.value
    if (!triggerBox || !dropdownBox) {
      return null
    }
    return {
          '--_actions-menu-top': `${triggerBox.top + triggerBox.height}`,
          '--_actions-menu-left': `${isAlternate ? triggerBox.left - dropdownBox.width + triggerBox.width: triggerBox.left}`,
        }
  })

  const onAction = (action: ActionName) => {
    emit('action', action)
    close()
  }
</script>

<template>
  <div class="actions-menu">
    <button class="actions-menu__trigger" type="button" @click="toggle" ref="trigger-ref">
      <Icon symbol="dots"></Icon>
      <VisuallyHidden>Действия с задачей</VisuallyHidden>
    </button>
    <Teleport to="body" defer v-if="isOpen">
      <div class="actions-menu__overlay" @click="close"></div>
      <ul
        ref="dropdown-ref"
        class="actions-menu__dropdown"
        :style="inlineStyles"
      >
        <ActionsMenuItem
          text="Редактировать"
          icon="edit"
          action-name="edit"
          @click="onAction"
        />
        <ActionsMenuItem
          text="Удалить"
          icon="delete"
          action-name="delete"
          @click="onAction"
        />
      </ul>
    </Teleport>
  </div>
</template>

<style scoped>
  .actions-menu {}

  .actions-menu__trigger {
    display: flex;
    border: none;
    padding: 0;
    background: none;
    color: var(--color-text-fade);
    cursor: pointer;

    &:hover {
      color: var(--color-action);
    }
  }

  .actions-menu__overlay {
    position: fixed;
    inset: 0;
  }

  .actions-menu__dropdown {
    position: fixed;
    inset-block-start: calc(var(--_actions-menu-top) * 1px);
    inset-inline-start: calc(var(--_actions-menu-left) * 1px);
    margin: 0;
    padding: 8px 0;
    list-style-type: '';
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-light-contrast);
    box-shadow: var(--box-shadow-md);
    animation: moveFromBottom 0.3s both;
  }

  @keyframes moveFromBottom {
    from {
      transform: translateY(0.5rem);
    }
  }
</style>