// app/page.tsx
'use client'
import './globals.css'

import AddTodo from './addTodo'
import SearchBar from "./searchbar"

export default function Page() {
  return (
    <div className="page w-6/12 mx-auto">
      <h1 className='text-xl w-2/12 my-5 mx-auto'>My To-Do List</h1>
      <SearchBar />
      <AddTodo />
    </div> 
  )
}
