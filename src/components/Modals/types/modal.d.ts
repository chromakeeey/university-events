declare module 'Modals' {
  interface BaseModalProps {
    visible?: boolean
    onSuccess?: () => void
    onCancel?: () => void
  }
}
