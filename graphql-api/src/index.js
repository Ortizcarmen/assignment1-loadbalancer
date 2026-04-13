const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const schema = buildSchema(`
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
    author(id: Int): Author
    books: [Book]
    book(id: Int): Book
    booksByGenre(genre: String): [Book]
  }
`)

const root = {
  authors: () => prisma.author.findMany({ include: { books: true } }),
  author: ({ id }) => prisma.author.findUnique({ where: { id }, include: { books: true } }),
  books: () => prisma.book.findMany({ include: { author: true } }),
  book: ({ id }) => prisma.book.findUnique({ where: { id }, include: { author: true } }),
  booksByGenre: ({ genre }) => prisma.book.findMany({ where: { genre }, include: { author: true } }),
}

const app = express()

app.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
})
