<script setup lang="ts">
  import { injectNotificationStore } from '@/providers/notificationStore'
  import Notification from '@/components/Notifications/Notification.vue'

  const notificationStore = injectNotificationStore()
</script>

<template>
  <TransitionGroup class="notifications-container" name="notification_state" tag="div">
    <Notification
      v-for="item in notificationStore.notifications.value"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      :title="item.title"
      :text="item.text"
    />
  </TransitionGroup>
</template>

<style scoped>
  .notifications-container {
    position: fixed;
    inset: 0;
    padding: 24px;
    display: grid;
    gap: 24px;
    grid-template-columns: minmax(0, 400px);
    justify-content: end;
    align-content: end;
    pointer-events: none;
  }
</style>