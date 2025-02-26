<script setup lang="ts">
  import { ref } from 'vue';
  import Modal from '@/components/Modal.vue'
  import Button from '@/components/Button.vue'
  import ButtonGroup from '@/components/ButtonGroup.vue'
  import TaskForm from '@/components/TaskForm.vue'
  import ActionsMenu from '@/components/ActionsMenu/ActionsMenu.vue'
  import type { ActionName } from '@/components/ActionsMenu/types'
  import { useConfirmation } from '@/composables/useConfirmation'
  import type { Task } from '@/types/task';
  import { injectTasksStore } from '@/providers/tasksStore';

  const props = defineProps<{
    id: Task['id']
    text: Task['text']
    column: Task['column']
  }>()

  const tasksStore = injectTasksStore()

  const deleteConfirmation = useConfirmation()

  const isEditMode = ref(false)

  const isDraging = ref(false)

  const enterEditMode = () => {
    isEditMode.value = true
  }

  const leaveEditMode = () => {
    isEditMode.value = false
  }

  const saveAfterEdit = (text: string) => {
    tasksStore.editTaskText(props.id, text)
    leaveEditMode()
  }

  const onAction = (action: ActionName) => {
    switch (action) {
      case 'edit': {
        enterEditMode();
        break
      }
      case 'delete': {
        deleteConfirmation.waitConfirm()
          .then(() => {
            tasksStore.deleteTask(props.id)
          })
          .catch(() => {})
        break
      }
      default: {
        console.warn(`Unknown action: ${action}`)
      }
    }
  }

  const onDragStart = (event: DragEvent) => {
    isDraging.value = true
    if (!event.dataTransfer) {
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('application/json', JSON.stringify(props.id))
  }

  const onDragEnd = () => {
    isDraging.value = false
  }
</script>

<template>
  <div
    v-if="!isEditMode"
    :class="['task-card', { 'task-card_is-draging': isDraging }]"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <div class="task-card__content">{{ props.text }}</div>
    <div class="task-card__tools">
      <ActionsMenu @action="onAction"/>
    </div>
  </div>
  <TaskForm v-else :initial-text="props.text" @save="saveAfterEdit" @cancel="leaveEditMode"/>

  <Modal :is-open="deleteConfirmation.isWaiting.value" @close="deleteConfirmation.reject">
    <template v-slot:title>
      Удалить задачу?
    </template>

    <template v-slot:default>
      {{ props.text }}
    </template>

    <template v-slot:footer>
      <ButtonGroup>
        <Button type="button" @click="deleteConfirmation.confirm">Удалить</Button>
        <Button type="button" @click="deleteConfirmation.reject">Отменить</Button>
      </ButtonGroup>
    </template>
  </Modal>
</template>

<style scoped>
  .task-card {
    contain: layout;
    box-sizing: border-box;
    min-height: 36px;
    padding: 8px;
    padding-inline-end: 24px;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius-md);
    background-color: var(--color-light-contrast);
    transition: 0.3s box-shadow;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &:not(.task-card_is-draging):hover {
      box-shadow: var(--box-shadow-md);
    }
  }

  .task-card_is-draging {
    border-style: dashed;
  }

  .task-card__content {
    white-space: pre-line;
  }

  .task-card__tools {
    position: absolute;
    inset-block-start: 4px;
    inset-inline-end: 4px;
  }
</style>