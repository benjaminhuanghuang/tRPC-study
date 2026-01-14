# Module 1: Introduction and Getting Started

```sh
npm init

mkdir packages/schema -p
cd packages/schema
npm init --scope easybooking


mkdir services/backend -p
cd services/backend
npm init --scope easybooking

```

Create workspaces in package.json under root folder

```json
"workspaces": [
    "packages/schema",
    "services/backend"
]
```

Install

```sh
npm i -D typescript @tsconfig/recommended
```

create tsconfig.json

```json
{
  "extends": "@tsconfig/recommended/tsconfig.json"
}
```

## Prettier and ESlint

```sh
npm i -D prettier

npm i eslint eslint-plugin-prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

package.json

```json
 "lint": " eslint .  -f visualstudio --report-unused-disable-directives --ext .ts, .tsx"
```

## Frontend

## Tailwind

https://tailwindcss.com/docs/installation/using-vite

```sh
npm install tailwindcss @tailwindcss/vite
```

## DB

```sh
docker run --name easybooking_db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=easybooking -p 5432:5432 -d postgres
```

```sh
cd packages/schema

npm i knex pg
```

Create knexfile.js

```sh
npx knex migrate:latest
```
