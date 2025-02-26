import type { Task } from '@/types/task'
import { tasks as mockTasks } from '@/mocks/tasks'

// для имитации медленных операций
const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export const tasksService = {
  async getAll() {
    await delay(Math.random() * 5000)
    return mockTasks
  },

  async create(task: Task) {
    await delay(Math.random() * 2000)
    console.log('create: ', task)
  },

  async delete(taskId: Task['id']) {
    await delay(Math.random() * 2000)
    console.log('delete: ', taskId)
  },

  async edit(taskId: Task['id'], data: Partial<Task>) {
    await delay(Math.random() * 2000)
    console.log('edit: ', taskId, data)
  }
}