# Theme

## How does the theme work

index.html

```html
<html lang="en" class="dark"></html>
```

## Coding

Create
client/src/features/shared/components/ThemeProvider.tsx
client/src/features/shared/components/ThemeToggle.tsx

client/src/lib/utils/localStorage.ts

Add ThemeToggle to client/src/features/shared/components/Navbar.tsx
Add ThemeProvider to client/src/App.tsx

```js
 <ThemeProvider defaultTheme="dark">
```
