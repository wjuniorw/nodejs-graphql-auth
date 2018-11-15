import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI || 'mongodb://localhost/auth'
mongoose.Promise = global.Promise
mongoose.connect(URI, { useNewUrlParser: true })

const db = mongoose.connection

db.on('open', ()=> {
  console.log('conexao com o DB aberta!')
})
db.on('close', ()=> {
  console.log('conexao com o DB fechada!')
  process.exit(0)
})

export default mongoose
