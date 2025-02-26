import { provide, inject, type InjectionKey } from 'vue'
import { useNotificationsStore } from '@/stores/useNotificationsStore'

type NotificationStore = ReturnType<typeof useNotificationsStore>

const key = Symbol() as InjectionKey<NotificationStore>

export const provideNotificationStore = (store: NotificationStore) => {
  provide(key, store)
}

export const injectNotificationStore = () => {
  const store = inject(key)
  if (store === undefined) {
    throw new Error('Notifications Store should be provided')
  }
  return store;
}