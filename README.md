# Assignment 07 — GraphQL API

##  Descripción

Este proyecto implementa una API utilizando **GraphQL** con el objetivo de demostrar cómo se pueden generar endpoints dinámicos sin necesidad de ajustarlos a campos específicos, a diferencia de REST.

---

##  Tecnologías utilizadas

- Node.js
- Apollo Server
- Prisma ORM
- PostgreSQL
- Supabase (Base de datos en la nube)
- Railway (Deploy del backend)
---



##  Endpoint público
https://assignment1-loadbalancer-production.up.railway.app/

Este endpoint permite realizar consultas GraphQL sin autenticación.

---

##  ¿Cómo funciona GraphQL en este proyecto?

A diferencia de REST, GraphQL permite al cliente solicitar únicamente los campos que necesita.

Ejemplo:

```graphql
query {
  books {
    title
  }
}

##  Base de Datos
Se utilizó Supabase como proveedor de base de datos PostgreSQL en la nube.

Características:
- Base de datos accesible desde internet
- No requiere instalación local
- Integración sencilla con Prisma

Configuración:
```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

Uso en el proyecto:
- Se definieron modelos en `schema.prisma`
- Se ejecutaron migraciones para crear las tablas
- Se insertaron datos de prueba utilizando seed

## Modelos disponibles
### Author (Autor)

## Relación entre modelos
- Un Author puede tener múltiples Books
- Un Book pertenece a un Author

## Queries disponibles

### Obtener todos los libros
```graphql
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
```

### Obtener un libro por ID
```graphql
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
```

### Obtener todos los autores
```graphql
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
```

### Obtener un autor por ID
```graphql
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
```

### Filtrar libros por género
```graphql
query {
  booksByGenre(genre: "Fantástico") {
    title
    publishedYear
    author {
      name
    }
  }
}
```

## Ejemplos de uso con curl

### Todos los libros
```bash
curl -X POST https://assignment1-loadbalancer-production.up.railway.app/ \
  -H 'content-type: application/json' \
  -d '{"query":"{ books { title genre author { name } } }"}'
```

### Todos los autores
```bash
curl -X POST https://assignment1-loadbalancer-production.up.railway.app/ \
  -H 'content-type: application/json' \
  -d '{"query":"{ authors { name nationality books { title } } }"}'
```

## Evidencia

### Endpoint funcionando
![Endpoint](docs/endpoint.png)

### Tablas en Supabase
![Supabase](docs/supabase-tables.png)

### Query funcionando
![Query](docs/query-result.png)

### Deploy en Railway
![Railway](docs/railway-deploy.png)



## Conclusión
GraphQL permite construir APIs más flexibles y eficientes, ya que el cliente puede decidir exactamente qué datos necesita, reduciendo el tráfico innecesario y mejorando el rendimiento.
