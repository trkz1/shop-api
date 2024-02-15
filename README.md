# Products REST API using NodeJs , ExpressJs, MongoDB

This repo contains a NodeJs REST API to create , read , update and delete products as well as buy products for authenticated users which will be stored in a MongoDB and can be deployed using docker .

# Requirements
* node (>= 18.16.0.) 
* typescript (>= 5.3.3)
* mongoose (>= 8.1.2)
* MongoDB
* Docker & docker-compose

# Running Locally
Please install the dependencies 
```commandline
npm install 
```

And then create a .env file (you can copy the .env.example file) and add the env variables

```commandline
MONGO_URI=
PORT=
TOKEN= (for jwt)
```

And now run the app using 
```commandline
npm run dev
```
you can now access the application using localhost:8080 'if the env port is 8080'

# Running using Docker and docker-compose
From the root project directory run
```commandline
docker-compose up -d
``` 
This command will create the app container and the mongodb container

you can now access the application using localhost:8080
