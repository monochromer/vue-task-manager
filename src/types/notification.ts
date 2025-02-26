export type Notification = {
  id: string
  type: 'success' | 'error'
  title: string
  text?: string
}