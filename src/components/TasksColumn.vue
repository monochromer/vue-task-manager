<script setup lang="ts">
  import { ref } from 'vue';
  import type { Task } from '@/types/task';
  import Icon from '@/components/Icon.vue'
  import TaskForm from '@/components/TaskForm.vue'
  import { injectTasksStore } from '@/providers/tasksStore';

  const props = defineProps<{
    id: number
    title: string
    color: string
  }>()

  defineSlots<{
    default(): any
  }>()

  const tasksStore = injectTasksStore()

  const isFormVisible = ref(false)

  const showForm = () => {
    isFormVisible.value = true
  }

  const hideForm = () => {
    isFormVisible.value = false
  }

  const onAddTask = (text: string) => {
    tasksStore.createTask(text, props.id)
    hideForm()
  }

  const isEnter = ref(false);

  const onDragEnter = () => {
    isEnter.value = true
  }

  const onDragLeave = (event: DragEvent) => {
    if (!(event.currentTarget instanceof Node && event.relatedTarget instanceof Node)) {
      return
    }
    if (event.currentTarget?.contains(event.relatedTarget)) {
      return
    }
    isEnter.value = false
  }

  const onDrop = (event: DragEvent) => {
    isEnter.value = false
    try {
      const data = event.dataTransfer?.getData('application/json') ?? ''
      const taskId = JSON.parse(data) as Task['id']
      const taskColumn = tasksStore.tasks.value[taskId].column
      if (taskColumn === props.id) {
        return
      }
      tasksStore.moveTask(taskId, props.id)
    } catch (error) {
      console.error('Invalid drop data: ', error)
    }
  }
</script>

<template>
  <section
    class="tasks-column"
    :class="{ 'tasks-column_is-enter': isEnter }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragover.prevent
  >
    <header class="tasks-column__header">
      <h2 class="tasks-column__title">{{ title }}</h2>
    </header>
    <div class="tasks-column__body" tabindex="0">
      <div class="tasks-column__list">
        <slot></slot>
      </div>
      <div class="tasks-column__tools">
        <div v-if="isFormVisible" class="tasks-column__form">
          <TaskForm @cancel="hideForm" @save="onAddTask"></TaskForm>
        </div>
        <button v-else class="tasks-column__add-button" type="button" @click="showForm">
          <Icon symbol="plus" />
          <span>Добавить</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .tasks-column {
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    transition: 0.2s;
  }

  .tasks-column_is-enter {
    border-color: v-bind(color);
    box-shadow: 0 0 0 1px v-bind(color);
  }

  .tasks-column__header {
    padding: 7px;
    background-color: v-bind(color);
  }

  .tasks-column__title {
    margin: 0;
    text-align: center;
    font-size: var(--font-size-md);
    font-weight: var(--font-semibold);
  }

  .tasks-column__body {
    overflow: auto;
    scrollbar-width: thin;
    background-color: var(--color-light-fade);
  }

  .tasks-column__list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    padding: 8px 8px 0;
  }

  .tasks-column__tools {
    position: sticky;
    bottom: 0;
    background-color: inherit;
  }

  .tasks-column__add-button {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border: none;
    display: flex;
    align-items: center;
    gap: 4px;
    font: inherit;
    color: var(--color-action);
    background: none;
    cursor: pointer;
  }

  .tasks-column__form {
    padding: 8px;
  }
</style>