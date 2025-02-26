import { provide, inject, type InjectionKey } from 'vue'
import { useTasksStore } from '@/stores/useTasksStore'

type TaskStore = ReturnType<typeof useTasksStore>

const key = Symbol() as InjectionKey<TaskStore>

export const provideTasksStore = (store: TaskStore) => {
  provide(key, store)
}

export const injectTasksStore = () => {
  const store = inject(key)
  if (store === undefined) {
    throw new Error('Tasks Store should be provided')
  }
  return store;
}