# ChatGPT Dumb Clone

This project is a dumb solution to recreate BE and FE for chatgpt clone. It has FE made with CRA (Create-React-App) which communicates with an ExpressJS server.

### Prerequisites

- Node.js
- npm or yarn
- Docker
- A modern web browser

## Quickstart Development App with Docker

With docker-compose:

```
npm run docker-dev-up
```

Or plain Docker:

```
docker-compose -f docker-compose.dev.yml up
```

Visit localhost at

```
http://localhost:3000
```

## Starting without Docker

### Frontend

#### Installing dependencies

```
cd ./frontend
```

Run command in `./frontend` directory

```
npm install
```

Or you can use yarn

```
yarn install
```

### Start development server

Run command in `./frontend` directory

```
npm start
```

Or you can use yarn

```
yarn start
```

The server will start on

```
http://localhost:3000
```

### Backend

#### Installing dependencies

```
cd ../backend
```

Run command in `./backend` directory

```
npm install
```

Or you can use yarn

```
yarn install
```

### Start development server

Run command in `./backend` directory

```
npm run dev
```

Or you can use yarn

```
yarn start
```

The server will start on

```
http://localhost:5000
```

## Missing features

- Delete a chat from react app
- Rename a chat from react app
- Github OAuth Button (Available in Server)
- Tests
- Infinite fetch
- React Query (TanStack Query)
- Automatic logout after expired session (axios interceptors)

## Some added features and technical idealogies

- Compound component architecture (FE)
- Typescript
- MVC (BE)
- Docker
- Feature based architecture (FE)
- Custom hooks
- Design principles
