# Movement Lab

An interactive Year 11 Health and Movement Science learning workspace built with React, TypeScript and Vite. No account, backend or API keys are required.

## Development

```sh
npm ci --cache /tmp/movement-npm-cache
npm run dev
```

`npm run build` type-checks and builds the application. `npm run preview` serves the production build.

## Teaching

Use Teacher Mode to toggle explanatory feedback, reveal suggested analyses, jump between activities, reset student work and add direct HTTPS MP4/video URLs. Footage must be appropriate and licensed for classroom use. Player frame stepping approximates 30 fps. The four supplied athlete clips are bundled in `public/videos` and available to all students. Existing sessions receive these defaults without losing responses or custom teacher links. Students can use supplied profile evidence before footage is added.

Student responses, notes, video settings and progress are stored in this browser's localStorage. Reset retains teacher video links and feedback settings. Clearing browser storage removes saved work. There is no transmission of inbox responses.

Slider classifications are contextual suggested analyses, not exact graded answers. The inbox checklist uses keyword heuristics and does not assess reasoning quality. Stage-of-learning classifications depend on observed performance, not experience alone.

## Organisation

- `src/main.tsx`: application shell and interactive activity workflows
- `src/data.ts`: athlete cases, classifications and saved-state types
- `src/components.tsx`: reusable sliders, video analysis, notes, court and inbox controls
- `src/styles.css`: responsive design system and reduced-motion support

This cloud workspace is already isolated; use the existing checkout without creating another worktree.
