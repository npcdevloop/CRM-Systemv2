import type { validationTaskParams } from '../types/interface'

export async function validationTask ({
  event,
  title,
  setErrorText,
  updateTasks,
  createTask,
  updateTaskTitle,
  setEdit,
  id
}: validationTaskParams) {
  if (title.length < 2) {
    event.preventDefault()
    setErrorText('Ошибка сохранения! Минимум 2 символа, максимум 64!')
  } else if (title.length >= 2 && title.length <= 64) {
    setErrorText('')

    if (id !== undefined) {
      setEdit!(false)
      await updateTaskTitle!(id!, title)
    } else {
      await createTask!(title)
    }

    await updateTasks()
  }
}
