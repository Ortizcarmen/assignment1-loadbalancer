# Assignment 01 — Load Balancer Round Robin

## Descripción

Se implementa un balanceador de carga usando Nginx con algoritmo Round Robin,
distribuyendo tráfico entre dos servidores web en contenedores Docker.

## Infraestructura

Cliente → Nginx Load Balancer → server1
                             → server2

## Diagrama

```
Cliente
   |
Load Balancer (Nginx)
   |        |
server1   server2
```

## Comando para ejecutar

docker compose up --build

## URL de acceso

http://localhost:8080

## Funcionamiento

Al refrescar la página, el balanceador distribuye las peticiones alternadamente:

- Hola mundo desde server 1
- Hola mundo desde server 2
