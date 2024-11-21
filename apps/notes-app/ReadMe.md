pnpm drizzle-kit generate --config=src/drizzle-dev.config.ts
pnpm drizzle-kit generate --config=src/drizzle-prod.config.ts

pnpm drizzle-kit migrate --config=src/drizzle-dev.config.ts
pnpm drizzle-kit migrate --config=src/drizzle-prod.config.ts