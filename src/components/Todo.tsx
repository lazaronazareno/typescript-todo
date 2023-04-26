import { useEffect, useRef, useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  isEditing: string
  setIsEditing: (completed: string) => void
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
}
export const Todo: React.FC<Props> = ({ id, title, completed, isEditing, setIsEditing, setTitle, onToggleCompleteTodo, onRemoveTodo }) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({
      id,
      completed: event?.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo({ id })
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          className="toggle"
          checked={completed}
          type="checkbox"
          onChange={handleChangeCheckbox}
        />
        <label>{title}</label>
        <button
          className='destroy'
          onClick={() => {
            onRemoveTodo({ id })
          }}
        />
      </div>

      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
