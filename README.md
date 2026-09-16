# Neswear Backend

Backend API for Neswear, a men's fashion e-commerce platform.

## Stack

- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- Redis
- BullMQ
- Azure Blob Storage
- Docker

## Features

- User authentication and authorization
- Product and product variant management
- Shopping cart
- Address management
- Order management
- Payment flow (simulation)
- Order status history
- Background jobs with BullMQ
- Image storage with Azure Blob Storage

## API

Swagger: 

`/api`

Main endpoints:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/me/addresses`
- `GET /api/users/me`
- `GET /api/products`
- `GET /api/products/{slug}`
- `POST /api/cart/items`
- `GET /api/cart/items`
- `PATCH /api/cart/items/{id}/quantity`
- `DELETE /api/cart/items`
- `DELETE /api/cart/items/{id}`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{id}`
- `PATCH /api/orders/:id/cancel`

## Getting started

1. Create a `.env` file from `.env.example` and update the values as needed:

```bash
cp .env.example .env
```

2. Make sure Docker is installed and running, then start the required services:

```bash
docker compose up -d
```

3. Install project dependencies:

```bash
npm install
```

4. Seed the database:

```bash
npm run seed
```

5. Start the server:


```bash
npm run start:dev
```

6. There you go! After the above steps, the API is available at:
http://localhost:3001/api

## Related Repositories

- [Neswear Frontend](https://github.com/levanvux/neswear-frontend)
- [Neswear Deployment](https://github.com/levanvux/neswear-deploy)
