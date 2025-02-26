import { computed, ref } from 'vue'
import type { Notification } from '@/types/notification'

type StoreSettings = {
  capacity?: number
  timeout?: number
}

export const useNotificationsStore = (settings?: StoreSettings) => {
  const {
    capacity = 3,
    timeout = 1000 * 5
  } = settings ?? {}

  const _notifications = ref<Array<Notification>>([])

  const notifications = computed(() => _notifications.value.slice(-1 * capacity))

  const add = (notification: Notification) => {
    _notifications.value.push(notification)
  }

  const show = (notification: Omit<Notification, 'id'>) => {
    const notificationData = {
      ...notification,
      id: Math.random().toString(32)
    }
    add(notificationData)
    setTimeout(() => {
      hide(notificationData.id)
    }, timeout)
  }

  const hide = (id: Notification['id']) => {
    const index = _notifications.value.findIndex((notification) => notification.id === id)
    _notifications.value.splice(index, 1)
  }

  return {
    notifications,
    show,
    hide
  }
}