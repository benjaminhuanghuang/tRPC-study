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
