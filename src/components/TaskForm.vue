<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Icon from '@/components/Icon.vue'
  import VisuallyHidden from '@/components/VisuallyHidden.vue'

  const props = defineProps<{
    initialText?: string
  }>()

  const emit = defineEmits<{
    save: [text: string]
    cancel: []
  }>()

  const inputRef = ref<HTMLTextAreaElement>()

  const taskText = ref(props.initialText ?? '')

  const cancel = () => {
    emit('cancel')
  }

  const save = () => {
    const text = taskText.value.trim()
    if (!text) {
      return
    }
    emit('save', text)
  }

  onMounted(() => {
    inputRef.value?.focus()
  })
</script>

<template>
  <form class="task-form" @submit.prevent="save" @reset="cancel">
    <div class="task-form__input-wrapper">
      <div class="task-form__input task-form__hidden-input" aria-hidden>{{ taskText }}</div>
      <textarea class="task-form__input" v-model="taskText" ref="inputRef" placeholder="Введите текст..."></textarea>
    </div>
    <div class="task-form__controls">
      <button class="task-form__button task-form__button_type_reset" type="reset">
        <Icon symbol="cross" />
        <VisuallyHidden>Отменить</VisuallyHidden>
      </button>
      <button class="task-form__button task-form__button_type_save" type="submit">
        <Icon symbol="check" />
        <VisuallyHidden>Сохранить</VisuallyHidden>
      </button>
    </div>
  </form>
</template>

<style scoped>
  .task-form {
    position: relative;
  }

  .task-form__input-wrapper {
    display: grid;

    & > * {
      grid-area: 1 / 1 / -1 / -1;
    }
  }

  .task-form__hidden-input {
    visibility: hidden;
    white-space: pre-wrap;

    &::after {
      content: ' ';
    }
  }

  .task-form__input {
    margin: 0;
    appearance: none;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    min-height: calc(20px * 2 + 4px * 2);
    padding: 8px;
    padding-inline-end: 24px;
    border: 1px solid var(--color-action);
    font: unset;
    border-radius: var(--border-radius-md);
    resize: none;

    &::placeholder {
      all: unset;
      color: var(--color-text-fade);
    }
  }

  .task-form__controls {
    position: absolute;
    inset-block-start: 4px;
    inset-inline-end: 4px;
  }

  .task-form__button {
    border: 0;
    padding: 0;
    display: flex;
    cursor: pointer;
    background: none;
  }

  .task-form__button_type_reset {
    color: var(--color-danger);
  }

  .task-form__button_type_save {
    color: var(--color-success);
  }
</style>