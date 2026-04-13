const { ApolloServer, gql } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Aquí defines QUÉ tipos de datos existen y qué queries puedes hacer
// Es como el "menú" de tu API
const typeDefs = gql`
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

// Aquí defines CÓMO se obtienen los datos para cada query
const resolvers = {
  Query: {
    authors: () => prisma.author.findMany({ include: { books: true } }),
    author: (_, { id }) => prisma.author.findUnique({ where: { id }, include: { books: true } }),
    books: () => prisma.book.findMany({ include: { author: true } }),
    book: (_, { id }) => prisma.book.findUnique({ where: { id }, include: { author: true } }),
    booksByGenre: (_, { genre }) => prisma.book.findMany({ where: { genre }, include: { author: true } }),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'omit',
    },
  },
})

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 GraphQL API corriendo en ${url}`)
})
