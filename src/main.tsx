import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Assignment/Styles.ts'
//import TodoList from './component/TodoList.tsx'
import Course from './Assignment/Course.tsx'
//import TodoListHookFrom from './component/TodoListHookFrom.tsx'
//import TodoListZod from './component/TodoListZod.tsx'
import HookZod from './Assignment/HookZod.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Course />
    <HookZod />
    {/* <TodoList /> */}
    {/* <TodoListHookFrom /> */}
    {/* <TodoListZod /> */}

  </StrictMode>,
)
