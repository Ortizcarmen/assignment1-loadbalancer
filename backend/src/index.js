const express = require('express')
const cors = require('cors')
require('dotenv').config()

const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🌸' })
})

app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
