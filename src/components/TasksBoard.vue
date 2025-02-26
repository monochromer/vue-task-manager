<script setup lang="ts">
  import { onMounted } from 'vue'
  import TasksColumn from '@/components/TasksColumn.vue'
  import TasksColumnSkeleton from '@/components/TasksColumnSkeleton.vue'
  import TaskCard from '@/components/TaskCard.vue'
  import { columnsConfig, columnsConfigMap } from '@/column-config'
  import { injectTasksStore } from '@/providers/tasksStore'
  import { injectNotificationStore } from '@/providers/notificationStore'

  const notificationStore = injectNotificationStore()
  const tasksStore = injectTasksStore()

  onMounted(() => {
    tasksStore.load()

    tasksStore.on((params) => {
      switch (params.operation) {
        case 'delete': {
          notificationStore.show({
            type: params.status,
            title: 'Задача удалена',
            text: params.task.text
          })
          break
        }
        case 'create': {
          notificationStore.show({
            type: params.status,
            title: `Задача создана в "${columnsConfigMap[params.task.column].title}"`,
            text: params.task.text
          })
          break
        }
        case 'move': {
          notificationStore.show({
            type: params.status,
            title: `Задача перемещена в "${columnsConfigMap[params.task.column].title}"`,
            text: params.task.text
          })
          break
        }
      }
    })
  })
</script>

<template>
  <div class="tasks-board">
    <template v-if="tasksStore.isLoading.value">
      <TasksColumnSkeleton v-for="item in 5" :key="item" />
    </template>
    <template v-else>
      <TasksColumn
        v-for="column in columnsConfig"
        :key="column.id"
        :id="column.id"
        :title="column.title"
        :color="column.color"
      >
        <TaskCard
          v-for="taskId in tasksStore.groups.value[column.id]"
          :key="taskId"
          :id="taskId"
          :text="tasksStore.tasks.value[taskId].text"
          :column="tasksStore.tasks.value[taskId].column"
        />
      </TasksColumn>
    </template>
  </div>
</template>

<style scoped>
  .tasks-board {
    position: absolute;
    inset: 0;
    padding: 48px 52px 24px;
    overflow: auto;
    display: grid;
    gap: 8px;
    grid-auto-flow: column;
    grid-auto-columns: minmax(min(100%, 180px), 300px);
  }
</style>