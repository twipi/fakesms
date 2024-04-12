import { writable } from "svelte/store"

export type Toast = {
  type: "info" | "error"
  message: string
  title?: string
  id?: number // auto-incremented
}

let id = 0

// toasts is a store that contains all the toasts that are currently visible.
export const toasts = writable<Toast[]>([])

// addToast adds a new toast to the toasts store.
export function addToast(toast: Toast) {
  toasts.update((prev) => [...prev, { ...toast, id: id++ }])
}

// removeToast removes a toast from the toasts store.
export function removeToast(toast: Toast) {
  toasts.update((prev) => prev.filter((t) => t.id !== toast.id))
}
