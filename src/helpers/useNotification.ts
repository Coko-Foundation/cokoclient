import { App } from 'antd'
import type { NotificationInstance } from 'antd/es/notification/interface'

export const useNotification = (): NotificationInstance => {
  const { notification } = App.useApp()

  return notification
}
