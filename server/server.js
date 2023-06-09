import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

// Constants
const URL_CONNECT = process.env.URL_CONNECT
const PORT = process.env.PORT

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

mongoose.connect(URL_CONNECT)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(e => console.error(e));

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));