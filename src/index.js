import express from 'express'
import { ApolloServer } from 'apollo-server-express'

const app = express()
const PORT = 9000
const SECRET = process.env.SECRET || 'So_Secret!'

import typeDefs from './schema'
import resolvers from './resolvers'
import db from './db'

const context = ({ req, res })=> ({
  db,
  user: req.user,
  token: req.headers['auth-token'],
  SECRET,
})

const server = new ApolloServer({
  typeDefs, resolvers, context,
})

server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`A magica acontece na path: http://localhost:${PORT}${server.graphqlPath}`)
})
