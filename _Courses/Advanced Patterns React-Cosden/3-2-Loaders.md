# Loading data through loaders

client/src/routes/index.tsx

```js
export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ context: { trpcQueryUtils } }) => {
    await trpcQueryUtils.experiences.feed.prefetchInfinite({});
  },
});
```

client/src/router.tsx

```js
 defaultPendingComponent: () => (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    ),
```
