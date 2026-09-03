# Agent Rules — Loomshine Web Project

This directory contains instructions for automated agent workflows and coding assistants working on the **Loomshine** repository.

## Rule 1: Respect Project Structure
- Always read `AGENTS.md` and `docs/` before making structural edits.
- Maintain CSS variables in `src/index.css` for consistent design system tokens.
- Keep components modular, single-responsibility, and easy to maintain.

## Rule 2: Brand Consistency
- Use **Loomshine** as the official brand name across all user-facing content, metadata, and docs.
- Treat references to "The Loom" in design references as visual direction, not brand overrides.

## Rule 3: Sequential Implementation
- Execute development tasks in the order defined in `docs/TASKS.md`.
- Never execute multiple sections simultaneously without verifying the previous task.
- Run `npm run build` or Vite checks to ensure clean builds without warnings or errors.

## Rule 4: Data & API Isolation
- All mock datasets belong in `src/data/`.
- Interactive components (e.g. order tracking, pincode checker, booking form) must receive mock handlers or props that mimic API behavior without hardcoding fake backend status responses directly in UI components.
