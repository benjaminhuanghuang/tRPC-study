# Comments

## List

client/src/features/comments/components/CommentsSection.tsx
client/src/features/comments/components/CommentList.tsx
client/src/features/comments/components/CommentCard.tsx

```js
const commentsQuery = trpc.comments.byExperienceId.useQuery(
  { experienceId },
  {
    enabled: commentsCount > 0, // Only fetch comments if we know there are comments to fetch.
  }
);
```

## Create

client/src/features/comments/components/CommentCreateForm.tsx

## Edit

client/src/features/comments/components/CommentEditForm.tsx

CommentCardButtons

Modify server/features/comment/router.ts

## Delete
