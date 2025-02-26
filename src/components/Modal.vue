<script setup lang="ts">
  import Icon from '@/components/Icon.vue'
  import VisuallyHidden from '@/components/VisuallyHidden.vue'
  import { useEventListener } from '@/composables/useEventListener'

  defineProps<{
    isOpen: boolean
  }>()

  defineSlots<{
    title(): any
    default(): any
    footer(): any
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const close = () => {
    emit('close')
  }

  useEventListener(document, (event) => {
    if (event instanceof KeyboardEvent && event.code === 'Escape') {
      close()
    }
  })
</script>

<template>
  <Teleport to="body" v-if="$props.isOpen">
    <div class="modal" @click="close">
      <div class="modal__inner">
        <div class="modal__dialog" @click.stop>
          <button class="modal__close-button" type="button" @click="close">
            <Icon class="modal__close-icon" symbol="cross" />
            <VisuallyHidden>Закрыть</VisuallyHidden>
          </button>
          <h2 class="modal__title" v-if="$slots.title">
            <slot name="title"></slot>
          </h2>
          <div class="modal__content">
            <slot></slot>
          </div>
          <div class="modal__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .modal {
    position: fixed;
    inset: 0;
    overflow: auto;
    background-color: color-mix(in srgb, var(--color-dark-contrast) 60%, transparent);
    animation: fadeUp 0.3s both;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
    }
  }

  .modal__inner {
    display: grid;
    place-items: center;
    box-sizing: border-box;
    padding: 1rem;
    min-height: 100%;
  }

  .modal__dialog {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 500px;
    padding: 24px 40px 40px;
    display: grid;
    grid-gap: 24px;
    border-radius: var(--border-radius-md);
    background-color: var(--color-light-contrast);
    box-shadow: var(--box-shadow-lg);
    animation: showDialog 0.3s both;
  }

  @keyframes showDialog {
    from {
      scale: 0.95;
    }
  }

  .modal__title {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-semibold);
  }

  .modal__close-button {
    position: absolute;
    inset-block-start: 16px;
    inset-inline-end: 16px;
    display: flex;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    color: var(--color-text-fade);
  }

  .modal__close-icon {
    width: 24px;
  }
</style>