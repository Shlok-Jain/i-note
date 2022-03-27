const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
connectToMongo();

app.use(cors())
app.use(express.json())

//All our routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`INotebook app listening at http://localhost:${port}`)
})