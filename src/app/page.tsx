// app/page.tsx
'use client'
import './globals.css'

import AddTodo from './addTodo'
import TodoList from './todoList'

export default function Page() {
  return (
    <div className="page xl:w-6/12 mx-auto lg:w-8/12 md:w-10/12 sm:w-11/12">
      <h1 className='text-xl w-full text-center my-5 mx-auto'>My To-Do List</h1>
      <AddTodo />
      <TodoList />
    </div> 
  )
}
