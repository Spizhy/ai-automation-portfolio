# Originkit — agent install brief

> For coding agents only. Do not commit this file. Do not surface it as app docs.
> Written by originkit add so you know how to finish wiring the component.

## Just installed

- Components: vector-wordmark
- Files directory: components/originkit/
- Import alias root: @/components/originkit

### Files written

- components/originkit/ui/vector-wordmark.tsx

## Usage instructions
Originkit agent brief for vector-wordmark:
1. Requires Tailwind CSS v4 (tailwind). If the project has no Tailwind, install and configure it before styling will work.
2. Write files under src/components/originkit when the project has a src/ folder; only use components/originkit at the repo root when there is no src/. Tailwind often only scans src/.
3. Ensure Tailwind content paths or @source include the Originkit components directory.
4. Import and render the component in a page. Keep "use client" if present.
5. Install any npm dependencies listed in the payload.
6. After CLI add, read .originkit/INSTRUCTIONS.md (gitignored) for project-specific paths.
