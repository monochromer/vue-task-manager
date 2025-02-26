<script setup lang="ts">
  import { computed } from 'vue';
  import type { Notification } from '@/types/notification'
  import { injectNotificationStore } from '@/providers/notificationStore';
  import Icon from '@/components/Icon.vue'
  import VisuallyHidden from '@/components/VisuallyHidden.vue'

  const notificationStore = injectNotificationStore()

  const close = () => {
    notificationStore.hide(props.id)
  }

  const props = defineProps<Notification>()

  const icon = computed<'check' | 'cross'>(() => {
    return ({
      'success': 'check' ,
      'error': 'cross'
    } as const)[props.type]
  })
</script>

<template>
  <div class="notification" :class="`notification_type_${$props.type}`" role="alert">
    <button class="notification__close-button" type="button" @click="close">
      <Icon class="notification__button-icon" symbol="cross" />
      <VisuallyHidden>Закрыть уведомление</VisuallyHidden>
    </button>
    <b class="notification__title">
      {{  $props.title }}
    </b>
    <div class="notification__text" v-if="$props.text">
      {{ $props.text }}
    </div>
    <Icon class="notification__icon" :symbol="icon"></Icon>
  </div>
</template>

<style scoped>
  .notification {
    --_notification-accent-color: var(--notification-accent-color, currentColor);
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    min-height: 76px;
    padding-block: 16px;
    padding-inline: 64px 32px;
    display: grid;
    gap: 8px;
    border: 1px solid var(--color-border);
    background-color: var(--color-light-contrast);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--box-shadow-md);
    pointer-events: all;

    &::before {
      content: '';
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      width: 8px;
      background-color: var(--_notification-accent-color);
    }
  }

  .notification__title {
    font-weight: var(--font-semibold);
  }

  .notification__close-button {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    padding: 8px;
    border: 0;
    background: none;
    color: var(--color-text-fade);
    cursor: pointer;

    &:hover {
      color: hsl(from var(--color-text-fade) h s 50%);
    }
  }

  .notification__button-icon {
    width: 16px;
  }

  .notification__icon {
    position: absolute;
    inset-block-start: 16px;
    inset-inline-start: 24px;
    width: 14px;
    padding: 5px;
    border-radius: 50%;
    color: var(--color-light-contrast);
    background-color: var(--notification-accent-color);
  }

  .notification_type_success {
    --notification-accent-color: var(--color-success);
  }

  .notification_type_error {
    --notification-accent-color: var(--color-danger);
  }

  .notification_state-move,
  .notification_state-enter-active,
  .notification_state-leave-active {
    transition: all 0.3s ease;
  }
  .notification_state-enter-from,
  .notification_state-leave-to {
    opacity: 0;
    transform: translateX(1rem);
  }
</style>