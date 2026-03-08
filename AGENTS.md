# Agent Instructions & Project Context

Welcome, autonomous agent! This repository is a monorepo consisting of a Node.js/Express `backend` and a React/Vite `frontend`. 
Please read and adhere strictly to these guidelines when making changes.

## 🏗️ Architecture & Stack

### Backend (`/backend`)
- **Tech Stack:** Node.js, Express, Prisma (PostgreSQL), Zod, TypeScript.
- **Architecture:** Clean Architecture (`domain`, `application`, `infrastructure`, `presentation`).
- **Package Manager:** npm (`npm install` to install dependencies).

### Frontend (`/frontend`)
- **Tech Stack:** React, Vite, Tailwind CSS v4, Radix UI, React Router DOM, TypeScript.
- **Component Library:** shadcn/ui (customized, see `components/ui/`).
- **Package Manager:** npm (`npm install` to install dependencies).

---

## 🚀 Commands (Run from respective `frontend/` or `backend/` directory)

### Backend Commands
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (uses `nodemon` + `ts-node`)
- **Start production:** `npm start`
- **Lint:** No linter configured (run `npx tsc --noEmit` to type-check).
- **Test:** Currently, no test framework is set up (`npm test` will fail).

### Frontend Commands
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (Vite)
- **Build for production:** `npm run build`
- **Lint:** `npm run lint` (ESLint)
- **Test:** Currently, no test framework is set up.

### Running a Single Test
Since no testing framework is globally pre-configured, *if you are instructed to write tests or if you set up Vitest/Jest*, run a single test using:
- **Vitest (Recommended for Frontend):** `npx vitest run path/to/test.ts`
- **Jest (Alternative for Backend):** `npx jest path/to/test.ts`

---

## 🎨 Code Style Guidelines

### 1. Formatting & Syntax
- **Indentation:** The project uniquely uses **3 spaces** for indentation. DO NOT use 2 or 4 spaces. Preserve the 3-space indentation in both frontend and backend.
- **Quotes:** Use double quotes (`"`) for strings unless single quotes (`'`) are required by interpolation or specific ESLint rules.
- **Semicolons:** Do NOT use trailing semicolons (except where syntactically required to avoid ASI issues).
- **Line Length:** Try to keep lines reasonable, wrap long tailwind `className` strings intelligently (e.g., using `cn()` and arrays/multiline strings).

### 2. Imports
- **Path Aliases:** Both projects are configured to use `@/` for absolute imports mapped to their respective `src/` directories. ALWAYS use `@/` over deep relative paths (e.g., prefer `import { User } from "@/domain/entities/User"` instead of `../../domain/...`).
- **Organization:** Group imports logically: 
  1. Built-in/External libraries (e.g., `react`, `express`, `zod`).
  2. Internal absolute imports (`@/...`).
  3. Relative imports (`./...`, `../...`).

### 3. TypeScript & Types
- **Strict Mode:** TypeScript is configured with `strict: true`. Avoid using `any`. Use `unknown` if the type is truly dynamic, and validate it.
- **Zod for Validation:** Use Zod schemas for validating incoming requests in the backend and form data in the frontend.
- **Interfaces vs Types:** Prefer `interface` for object definitions and contract models (e.g., `export interface UsuarioProps`). Use `type` for unions, intersections, and primitives.

### 4. Naming Conventions & Language
- **Language:** The codebase uses a mix of English and Spanish.
  - Domain concepts, database fields, and file names often use Spanish (e.g., `Usuario.ts`, `fechaCreacion`, `roles`).
  - Standard programming constructs, hooks, and generic UI components use English (e.g., `Button.tsx`, `useAuth`, `errorHandler`).
  - *Rule:* Match the language of the surrounding module. If creating a new domain entity, use Spanish. If creating a utility hook, use English.
- **Variables/Functions:** camelCase (e.g., `fechaModifica`, `getUser`).
- **Classes/Interfaces/Components:** PascalCase (e.g., `UsuarioProps`, `Rol`, `LoginForm`).
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`).
- **File Names:**
  - React components: PascalCase (e.g., `App.tsx`, `LoginForm.tsx`) unless part of `ui/` library which uses kebab-case (e.g., `button.tsx`).
  - Domain models/entities: PascalCase (e.g., `Usuario.ts`).
  - Utilities/Services: camelCase or kebab-case (e.g., `server.ts`, `app.ts`).

### 5. Error Handling
- **Backend:** 
  - Never throw unhandled exceptions in presentation routes. 
  - Pass errors to `next(error)` so they are caught by the global `errorHandler` middleware.
  - Return standardized JSON responses.
- **Frontend:**
  - Catch API errors and display them using the `sonner` toast notification library.
  - Use try-catch blocks in async functions and hooks.
  - Do not silently swallow errors in `console.error`; always provide user feedback.

### 6. Component & Architecture Guidelines
- **Frontend (React):** 
  - Use function components with hooks. DO NOT use class components.
  - Styling: Use Tailwind CSS v4. For complex conditional classes, use the custom `cn()` utility (combines `clsx` and `tailwind-merge`).
  - State Management: Prefer React Context (in `contexts/`) for global state, and local component state for UI toggles.
- **Backend (Clean Architecture):**
  - **Domain:** Pure TypeScript. Entities, interfaces, and custom errors. No external framework dependencies.
  - **Application:** Use cases and business logic.
  - **Infrastructure:** Prisma repositories, database connections, external APIs.
  - **Presentation:** Express routes, controllers, middlewares.

---

## 🛠️ Modifying the Codebase

1. **Understand First:** Before editing, use the `read`, `glob`, or `grep` tools to understand how similar features are currently implemented.
2. **Follow Conventions:** Match the existing coding style, even if it differs from your default preferences (e.g., the 3-space indentation rule).
3. **No Assumptions:** Do not assume a library is installed. Always check `package.json` first.
4. **Testing:** If instructed to write tests, verify the preferred testing framework with the user, install it if missing, and follow standard naming (`*.test.ts`).
