# node-rest-api-demo

## Demo
- [Demo URL](https://obscure-lake-86150.herokuapp.com/)

## Pre-requisites
- install [`node` and `npm`](https://nodejs.org/en/)

## Set the environment variable
1. create `env` file

```
cp .env.example .env
```
2. edit `env` file

```
DB_URI=mongodb://localhost:27017/***_db
TEST_DB_URI=mongodb://localhost:27017/***_db
PORT=****
HOST=****
CORS_ORIGIN="****"
```

## Install dependencies

```
git clone https://github.com/Venus713/node-rest-api-demo.git
cd node-rest-api-demo
npm install
```

## Uite Test

```
npm test
```

## Run

```
npm run start
```
## Docerize Deployment

```
docker-compose build
docker-compose up
```

## Heroku Deploy

```
heroku container:login
heroku create
heroku container:push web --app <your-app-name>
heroku container:release web --app <your-app-name>
```

## API endpoints

### Genre

```
post("/api/genres/")
get("/api/genres/")
get("/api/genres/:id")
delete("/api/genres/:id")
delete("/api/genres/")
```
### Movie

```
post("/api/movies/")
get("/api/movies/")
get("/api/movies/:id")
delete("/api/movies/:id")
delete("/api/movies/")
```
