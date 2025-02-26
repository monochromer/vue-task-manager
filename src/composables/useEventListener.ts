import { onMounted, onUnmounted } from 'vue'

export const useEventListener = (
  target: EventTarget,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions | boolean
) => {
  const register = () => {
    target.addEventListener('keyup', handler, options)
  }

  const cleanup = () => {
    target.removeEventListener('keyup', handler)
  }

  onMounted(register)

  onUnmounted(cleanup)

  return cleanup
}