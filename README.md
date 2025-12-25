# tRPC

tRPC is a TypeScript-first/TypeScript-only RPC framework that lets you build end-to-end type-safe APIs

tRPC lets the client call backend functions with full TypeScript types, as if they were local functions.

no schemas, no code generation.

## tRPC vs RPC

| Aspect         | tRPC                 | gRPC      |
| -------------- | -------------------- | --------- |
| Transport      | HTTP / fetch         | HTTP/2    |
| Data format    | JSON                 | Protobuf  |
| Typing         | TypeScript inference | IDL-based |
| Codegen        | ❌ No                | ✅ Yes    |
| Multi-language | ❌ TS only           | ✅ Many   |
| Performance    | Medium               | Very high |

👉 tRPC is not designed for polyglot microservices.

## When to use tRPC

✅ Perfect fit:

- Full-stack TypeScript apps
- Next.js / React / Vite
- Small-to-medium systems
- Single team
- Fast iteration

❌ Poor fit:

- Multi-language backends
- Public APIs
- High-throughput microservices
- Mobile clients in Swift/Kotlin
