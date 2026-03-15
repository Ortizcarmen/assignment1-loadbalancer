const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' })
  }
}

const createTask = async (req, res) => {
  try {
    const { title } = req.body
    const task = await prisma.task.create({
      data: { title }
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed }
    })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarea' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.task.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask }
