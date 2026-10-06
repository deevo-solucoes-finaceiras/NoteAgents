import pg from "pg"
import { randomUUID } from "node:crypto"

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não configurada")
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DATABASE_POOL_MAX ?? 10),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
})

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS git_repositories (
      id UUID PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      remote_url TEXT NOT NULL,
      local_path TEXT NOT NULL,
      default_branch TEXT NOT NULL DEFAULT 'main',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, name)
    )
  `)
  await pool.query(`CREATE INDEX IF NOT EXISTS git_repositories_user_id_idx ON git_repositories (user_id)`)
}

type RepositoryRecord = {
  id: string
  user_id: string
  name: string
  remote_url: string
  local_path: string
  default_branch: string
  created_at: Date
  updated_at: Date
}

export async function listRepositories(userId: string) {
  const result = await pool.query<RepositoryRecord>(
    `SELECT id, user_id, name, remote_url, local_path, default_branch, created_at, updated_at
     FROM git_repositories WHERE user_id = $1 ORDER BY updated_at DESC`,
    [userId],
  )
  return result.rows
}

export async function findRepository(userId: string, name: string) {
  const result = await pool.query<RepositoryRecord>(
    `SELECT id, user_id, name, remote_url, local_path, default_branch, created_at, updated_at
     FROM git_repositories WHERE user_id = $1 AND name = $2`,
    [userId, name],
  )
  return result.rows[0] ?? null
}

export async function createRepository(input: Omit<RepositoryRecord, "id" | "created_at" | "updated_at">) {
  const result = await pool.query<RepositoryRecord>(
    `INSERT INTO git_repositories (id, user_id, name, remote_url, local_path, default_branch)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, user_id, name, remote_url, local_path, default_branch, created_at, updated_at`,
    [randomUUID(), input.user_id, input.name, input.remote_url, input.local_path, input.default_branch],
  )
  return result.rows[0]
}

export async function touchRepository(userId: string, name: string) {
  await pool.query(`UPDATE git_repositories SET updated_at = NOW() WHERE user_id = $1 AND name = $2`, [userId, name])
}

export async function removeRepository(userId: string, name: string) {
  await pool.query(`DELETE FROM git_repositories WHERE user_id = $1 AND name = $2`, [userId, name])
}
