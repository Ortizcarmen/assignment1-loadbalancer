const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const typeDefs = `
  type Author {
    id: Int
    name: String
    nationality: String
    birthYear: Int
    bio: String
    createdAt: String
    books: [Book]
  }

  type Book {
    id: Int
    title: String
    genre: String
    publishedYear: Int
    pages: Int
    summary: String
    available: Boolean
    createdAt: String
    author: Author
    authorId: Int
  }

  type Query {
    authors: [Author]
    author(id: Int!): Author
    books: [Book]
    book(id: Int!): Book
    booksByGenre(genre: String!): [Book]
  }
`

const resolvers = {
  Query: {
    authors: () => prisma.author.findMany({ include: { books: true } }),
    author: (_, { id }) => prisma.author.findUnique({ where: { id }, include: { books: true } }),
    books: () => prisma.book.findMany({ include: { author: true } }),
    book: (_, { id }) => prisma.book.findUnique({ where: { id }, include: { author: true } }),
    booksByGenre: (_, { genre }) => prisma.book.findMany({ where: { genre }, include: { author: true } }),
  },
}

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  })
  console.log(`🚀 Servidor corriendo en ${url}`)
}

startServer()
