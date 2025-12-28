# Setup Monorepo project

Create pnpm-workspace.yaml

```sh
pnpm install
```

## Frontend setup: tailwind, shadcn

```sh
npm create vite@latest

```

Setup dependency

```json
 "dependencies": {
    "@advanced-react/server": "workspace:*",
    "@advanced-react/shared": "workspace:*",
 }
```

## Backend

server/index.ts

## Database

```sh
cd server
pnpm drizzle:generate
pnpm drizzle:migrate
pnpm drizzle:seed


pnpm drizzle:regenerate
```

### better-sqlite3 trouble shooting

```sh
nvm use v20

cd advanced-react
rm -rf node_modules pnpm-lock.yaml
pnpm install

cd node_modules/.pnpm/better-sqlite3@11.10.0/node_modules/better-sqlite3
npm run build-release
```

## Run

```sh
cd client
pnpm dev

cd server
pnpm dev
```
