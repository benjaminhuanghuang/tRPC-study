# InfiniteScroll

client/src/features/shared/components/InfiniteScroll.tsx

```js
function Index() {
  const experiencesQuery = trpc.experiences.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <InfiniteScroll onLoadMore={experiencesQuery.fetchNextPage}>
      <ExperienceList
        experiences={
          experiencesQuery.data?.pages.flatMap((page) => page.experiences) ?? []
        }
        isLoading={
          experiencesQuery.isLoading || experiencesQuery.isFetchingNextPage
        }
      />
    </InfiniteScroll>
  );
}
```
