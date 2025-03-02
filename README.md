
# Superhero Timer API

This project provides a simple API to manage superheroes and schedule messages with a delay.

## Tech Stack
This project utilizes the following technologies:

- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. 1 It provides a structured approach to development, making the codebase maintainable and testable.

- TypeORM: An ORM (Object-Relational Mapper) for TypeScript. It allows developers to interact with the database using object-oriented paradigms, simplifying database operations and providing type safety.

- RabbitMQ: A message broker that implements the Advanced Message Queuing Protocol (AMQP). It's used for asynchronous communication, enabling the application to handle delayed messages efficiently. When a timer is created, the message details are sent to RabbitMQ, which then delivers the message to the application after the specified delay.

- PostgreSQL: A powerful, open-source relational database management system. It's used for persistent storage of superhero data and timer information.

- Docker: A platform for building, shipping, and running applications in containers. Docker ensures that the application runs consistently across different environments.

## Requirements

- Docker
- NestJS
- Postman

## Setup Instructions

### Step 1: Docker Setup
Make sure you have Docker installed on your machine.

Run the following command from the root folder to build and start the application in detached mode:

```bash
docker-compose up --build -d
```

You should see logs indicating that the containers are up and running.

### Step 2: Create a Superhero
Ensure that you have Postman installed.

Make a POST request to the following route:

```
POST http://localhost:3000/superheroes
```

With the following request body:

```json
{
   "name": "Clark Kent",
   "alias": "Superman",
   "powers": ["Fly", "Strong", "Bulletproof"]
}
```

You will receive a response with the superhero data, including a unique `id`:

```json
{
   "name": "Clark Kent",
   "alias": "Super-man",
   "powers": ["Fly", "Strong", "Bulletproof"],
   "id": "88403e78-2a15-4ef7-82e0-9d7c10983cf9"
}
```

### Step 3: Fetch Superhero Info
To fetch the superhero details, make a GET request to the following route:

```
GET http://localhost:3000/superheroes/88403e78-2a15-4ef7-82e0-9d7c10983cf9
```

You will get the superhero details in the response.

### Step 4: Send a Delayed Message
To send a message with a delay, make a POST request to:

```
POST http://localhost:3000/timers
```

With the following request body:

```json
{
   "hours": 0,
   "minutes": 1,
   "seconds": 49,
   "message": "This is a test message from Superman",
   "url": "https://httpbin.org/post",
   "superheroId": "88403e78-2a15-4ef7-82e0-9d7c10983cf9"
}
```

You will receive a response with the timer ID and time left:

```json
{
   "id": "f57ae838-3e78-4579-a64c-2c5408a2c3cb",
   "timeLeft": 40.118
}
```

### Step 5: Check Time Left
To check the remaining time until the message is sent, make a GET request to:

```
GET http://localhost:3000/timers/f57ae838-3e78-4579-a64c-2c5408a2c3cb
```

You will receive a response with the remaining time:

```json
{
   "id": "f57ae838-3e78-4579-a64c-2c5408a2c3cb",
   "timeLeft": 30.221
}
```

## API Endpoints

- **POST** `/superheroes` - Create a new superhero.
- **GET** `/superheroes/{id}` - Fetch superhero details by ID.
- **POST** `/timers` - Send a message with a delay.
- **GET** `/timers/{id}` - Check the time left for a delayed message.

