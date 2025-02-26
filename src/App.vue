<script setup lang="ts">
  import TasksBoard from '@/components/TasksBoard.vue'
  import NotificationContainer from '@/components/Notifications/NotificationsContainer.vue'
  import { useTasksStore } from '@/stores/useTasksStore'
  import { useNotificationsStore } from '@/stores/useNotificationsStore'
  import { provideTasksStore } from '@/providers/tasksStore'
  import { provideNotificationStore } from './providers/notificationStore'

  const tasksStore = useTasksStore()
  provideTasksStore(tasksStore)

  const notificationStore = useNotificationsStore()
  provideNotificationStore(notificationStore)
</script>

<template>
  <TasksBoard></TasksBoard>
  <NotificationContainer />
</template>
