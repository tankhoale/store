import { useToast } from 'vue-toast-notification'
const toast = useToast()

export function showSuccess (message) {
  toast.success(message,
    {
      position: 'bottom-right',
      duration: 3000
    }
  )
}

export function showError (message) {
  toast.error(message, {
    position: 'bottom-right',
    duration: 3000
  })
}
