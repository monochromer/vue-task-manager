import { computed, ref, toRaw } from 'vue'
import type { Task } from '@/types/task'
import type { ColumnConfig } from '@/types/column-config'
import { tasksService } from '@/api/tasks'

type TasksRecord = Record<Task['id'], Task>
type TasksGroupsRecord = Record<ColumnConfig['id'], Array<Task['id']>>

type StatusType = 'success' | 'error'
type OperationType = 'create' | 'move' | 'delete'
type NotifyArgs = {
  status: StatusType,
  operation: OperationType,
  task: Task
}
type NotifyCallback = (arg: NotifyArgs) => void

export const useTasksStore = () => {
  const isLoading = ref(false)

  const tasks = ref<TasksRecord>({})

  const listeners = new Set<NotifyCallback>()

  const notify = (arg: NotifyArgs) => {
    for (const callback of listeners) {
      callback(arg)
    }
  }

  const off = (callback: NotifyCallback) => {
    listeners.delete(callback)
  }

  const on = (callback: NotifyCallback) => {
    listeners.add(callback)
    return () => off(callback)
  }

  const groups = computed(() => {
    return Object.values(tasks.value)?.reduce<TasksGroupsRecord>((acc, task) => {
      acc[task.column] = acc[task.column] ?? []
      acc[task.column].push(task.id)
      return acc;
    }, {})
  })

  async function load() {
    try {
      isLoading.value = true
      const loadedTasks = await tasksService.getAll()
      tasks.value = loadedTasks.reduce<TasksRecord>((record, task) => {
        record[task.id] = task
        return record
      }, {})
    } finally {
      isLoading.value = false
    }
  }

  const createTask = async (text: Task['text'], column: ColumnConfig['id']) => {
    const id = Math.random().toString(36)
    const task: Task = { id, text, column }
    tasks.value[id] = task
    try {
      await tasksService.create(task)
      notify({
        status: 'success',
        operation: 'create',
        task
      })
    } catch {}
  }

  const editTaskText = (id: Task['id'], text: Task['text']) => {
    const record = tasks.value
    if (!record) {
      return
    }
    if (!record[id]) {
      return
    }
    record[id].text = text
  }

  const deleteTask = async (id: Task['id']) => {
    const taskToDelete = toRaw(tasks.value[id])
    delete tasks.value[id]
    try {
      await tasksService.delete(id)
      notify({
        status: 'success',
        operation: 'delete',
        task: taskToDelete
      })
    } catch {}
  }

  const moveTask = async (id: Task['id'], to: ColumnConfig['id']) => {
    const taskToMove = tasks.value[id]
    taskToMove.column = to
    try {
      await tasksService.edit(id, taskToMove)
      notify({
        status: 'success',
        operation: 'move',
        task: taskToMove
      })
    } catch {}
  }

  return {
    load,
    isLoading,
    tasks,
    groups,
    createTask,
    editTaskText,
    deleteTask,
    moveTask,
    on,
    off,
    notify
  }
}