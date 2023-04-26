import { useState } from 'react'
import { type Todo as TodoType, type TodoId, type ListOfTodos } from '../types'
import { Todo } from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  todos: ListOfTodos
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onToggleCompleteTodo, setTitle, onRemoveTodo }) => {
  const [isEditing, setIsEditing] = useState('')
  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <ul className='todo-list' ref={parent}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo.id ? 'editing' : ''}
          `}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setTitle={setTitle}
            onToggleCompleteTodo={onToggleCompleteTodo}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  )
}
