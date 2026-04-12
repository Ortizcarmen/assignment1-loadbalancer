# Assignment 07 — GraphQL API

##  Descripción

Este proyecto implementa una API utilizando GraphQL con el objetivo de demostrar cómo se pueden generar endpoints dinámicos sin necesidad de ajustarlos a campos específicos, a diferencia de REST.

Se utilizó:
- Node.js
- Apollo Server
- Prisma ORM
- PostgreSQL (base de datos)

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

## Modelo de Base de Datos
