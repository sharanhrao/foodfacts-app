# POST Mutations — useMutation, onSuccess, and Cache Invalidation

A small Threadbase assignment project demonstrating:

- `useQuery` for automatic reads
- `useMutation` for user-triggered writes
- `mutationFn: createThread`
- `mutation.mutate({ title, body })`
- `mutation.isPending` to prevent double submits
- `onSuccess` + `queryClient.invalidateQueries({ queryKey: ["threads"] })`
- Inline mutation errors
- POST → 201 → GET refetch

## Run

```bash
npm install
npm run setup
cp client/.env.development.example client/.env.development
npm run dev
```

Then open:

`http://localhost:5173`

The API runs on port `3001`.

## Verify

Open DevTools → Network, create a thread, and observe:

1. `POST /api/threads` → `201`
2. `GET /api/threads` immediately afterward
3. The new thread appears without a page reload

To test errors, submit with an empty title or body.

## Git / PR

Create the requested branch:

```bash
git checkout -b feat/create-thread-mutation
git add .
git commit -m "feat: post a thread with useMutation and invalidate the list"
git push origin feat/create-thread-mutation
```

Then open a PR from your fork's `feat/create-thread-mutation` branch into your fork's `main`.
