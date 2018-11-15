import express from 'express'
import { ApolloServer } from 'apollo-server-express'

const app = express()
const PORT = 9000

import typeDefs from './schema'

const server = new ApolloServer({
  typeDefs,
})

server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`A magica acontece na porta: ${PORT}`)
})
