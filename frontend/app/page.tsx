'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL

interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`)
      setTasks(res.data)
    } catch (error) {
      console.error('Error al obtener tareas', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    if (!newTask.trim()) return
    try {
      const res = await axios.post(`${API}/api/tasks`, { title: newTask })
      setTasks([...tasks, res.data])
      setNewTask('')
    } catch (error) {
      console.error('Error al crear tarea', error)
    }
  }

  const toggleTask = async (id: number, completed: boolean) => {
    try {
      const res = await axios.put(`${API}/api/tasks/${id}`, { completed: !completed })
      setTasks(tasks.map(t => t.id === id ? res.data : t))
    } catch (error) {
      console.error('Error al actualizar tarea', error)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error al eliminar tarea', error)
    }
  }

  return (
    <main className="min-h-screen bg-rose-50 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold text-rose-500 mb-2 text-center">
          My Tasks 🌸
        </h1>
        <p className="text-rose-300 text-center mb-10 text-sm tracking-widest uppercase">
          stay organized, stay powerful
        </p>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && createTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white text-gray-700 placeholder-rose-200"
          />
          <button
            onClick={createTask}
            className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p className="text-center text-rose-300">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-rose-300">No tasks yet. Add one above! 🌷</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-rose-100"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed)}
                  className="w-5 h-5 accent-rose-400 cursor-pointer"
                />
                <span className={`flex-1 text-gray-700 ${task.completed ? 'line-through text-rose-300' : ''}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-rose-300 hover:text-rose-500 transition-colors text-lg"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center text-rose-200 text-xs mt-10">
          {tasks.filter(t => t.completed).length}/{tasks.length} tasks completed
        </p>
      </div>
    </main>
  )
}
