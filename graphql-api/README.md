# Assignment 07 — GraphQL API

## Descripción

Este proyecto implementa una API utilizando GraphQL con el objetivo de demostrar cómo se pueden generar endpoints dinámicos sin necesidad de ajustarlos a campos específicos, a diferencia de REST.

## Tecnologías utilizadas

- Node.js
- express-graphql
- Prisma ORM
- PostgreSQL
- Supabase (Base de datos en la nube)
- Railway (Deploy del backend)

## Endpoint público

https://assignment1-loadbalancer-production.up.railway.app/

Este endpoint permite realizar consultas GraphQL sin autenticación.

## ¿Cómo funciona GraphQL en este proyecto?

A diferencia de REST, GraphQL permite al cliente solicitar únicamente los campos que necesita. Un solo endpoint responde todas las consultas.

Ejemplo — solo títulos:

    query {
      books {
        title
      }
    }

Ejemplo — todos los campos:

    query {
      books {
        id
        title
        genre
        publishedYear
        pages
        summary
        available
        author {
          name
          nationality
        }
      }
    }

## Base de datos

Se utilizó Supabase como proveedor de base de datos PostgreSQL en la nube. Se definieron modelos en schema.prisma, se ejecutaron migraciones para crear las tablas y se insertaron datos de prueba con seed.

## Modelos disponibles

### Author (Autor)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | Identificador único autoincremental |
| name | String | Nombre completo del autor |
| nationality | String | Nacionalidad del autor |
| birthYear | Int | Año de nacimiento |
| bio | String | Biografía corta (opcional) |
| createdAt | String | Fecha de creación del registro |
| books | [Book] | Lista de libros asociados al autor |

### Book (Libro)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | Identificador único autoincremental |
| title | String | Título del libro |
| genre | String | Género literario |
| publishedYear | Int | Año de publicación |
| pages | Int | Número de páginas |
| summary | String | Resumen del libro (opcional) |
| available | Boolean | Disponibilidad del libro |
| createdAt | String | Fecha de creación del registro |
| author | Author | Autor relacionado |
| authorId | Int | ID del autor (llave foránea) |

### Relación entre modelos

Un Author puede tener múltiples Books.
Un Book pertenece a un Author.

## Queries disponibles

### Obtener todos los libros

    query {
      books {
        id
        title
        genre
        publishedYear
        pages
        available
        author {
          name
        }
      }
    }

### Obtener un libro por ID

    query {
      book(id: 1) {
        title
        summary
        author {
          name
          nationality
        }
      }
    }

### Obtener todos los autores

    query {
      authors {
        id
        name
        nationality
        birthYear
        books {
          title
        }
      }
    }

### Obtener un autor por ID

    query {
      author(id: 1) {
        name
        bio
        books {
          title
          genre
        }
      }
    }

### Filtrar libros por género

    query {
      booksByGenre(genre: "Fantástico") {
        title
        publishedYear
        author {
          name
        }
      }
    }

## Ejemplos de uso con curl

Todos los libros:

    curl -X POST https://assignment1-loadbalancer-production.up.railway.app/ \
      -H 'content-type: application/json' \
      -d '{"query":"{ books { title genre author { name } } }"}'

Todos los autores:

    curl -X POST https://assignment1-loadbalancer-production.up.railway.app/ \
      -H 'content-type: application/json' \
      -d '{"query":"{ authors { name nationality books { title } } }"}'

## Evidencias del funcionamiento

### GraphiQL funcionando

![GraphiQL](docs/graphql.png)

### Tablas en Supabase

![Supabase Tables](docs/supabase-tables.png)

### Query funcionando

![Query Result](docs/query-result.png)

### Despliegue en Railway

![Railway Deploy](docs/railway-deploy.png)

## Conclusión

GraphQL permite construir APIs más flexibles y eficientes. El cliente decide exactamente qué datos necesita, reduciendo tráfico innecesario y mejorando el rendimiento.
