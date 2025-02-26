import { computed, ref } from 'vue'

type ConfirmationState<T = unknown, E = unknown> = {
  resolve: (value?: T) => void;
  reject: (value?: E) => void;
};

export const useConfirmation = () => {
  const state = ref<ConfirmationState | null>(null)

  const isWaiting = computed(() => state.value !== null)

  const waitConfirm = () => {
    return new Promise((resolve, reject) => {
      state.value?.reject()
      state.value = { resolve, reject }
    })
  }

  const confirm = () => {
    state.value?.resolve()
    state.value = null
  }

  const reject = () => {
    state.value?.reject()
    state.value = null
  }

  return {
    waitConfirm,
    confirm,
    reject,
    isWaiting
  }
}