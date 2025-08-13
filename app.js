import express from 'express';
import cors from 'cors';
import route_transactions from './routes/route.js'

API = '3000'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', route_transactions)





app.listen(API, () => {
    console.log('✅ Aplicacion corriendo correctamente en http://localhost:3000/api/v1');
})

