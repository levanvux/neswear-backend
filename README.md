<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Built with the <a href="https://nestjs.com/" target="_blank">NestJS</a> framework.</p>

## How to run it

1. Create `.env` file from the `.env.example` file (modify the values as needed).

2. Setup Docker on your machine and make sure it is running. Then start the containers:

```bash
$ docker compose up --build
```

3. Seed data:

```bash
# Get the backend container name
docker ps

# Replace with the backend container name found above
docker compose exec <replace-me> npm run seed
```

4. There you go!

<!--
1. Create `.env` file from the `.env.example` file (modify the values as needed).

2. Setup Docker on your machine and make sure it is running. Then start the containers:

```bash
$ docker compose up -d
```

3. Install dependencies:

```bash
$ npm install
```

4. Seed data

```bash
$ npm run seed
```

5. Run the project:

```bash
$ npm run start
``` -->
