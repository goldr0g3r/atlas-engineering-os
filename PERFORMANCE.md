# Performance changes

- Route-level `loading.tsx` skeletons provide immediate streamed fallbacks for dynamic project routes.
- The project header is isolated behind its own Suspense boundary so project content and header work can stream independently.
- Project and project-list queries run concurrently and project options use a projection.
- The project selector uses a React transition, reports pending state, and lightly prefetches likely destinations.
- Compound MongoDB indexes match the project-scoped query shapes.
- MongoDB connection and index initialization promises are reused within a server process.

Measure production builds rather than `next dev`, because automatic route prefetching is production behavior.
