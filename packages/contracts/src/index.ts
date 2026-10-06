import { z } from 'zod'

// ============================================================
// Response Envelope Functions
// ============================================================

/** Cria uma resposta de sucesso padronizada */
export function success<T>(data: T, requestId: string): { success: boolean; data: T; requestId: string } {
  return { success: true, data, requestId }
}

/** Cria uma resposta de erro padronizada */
export function failure(code: string, message: string, requestId: string): { success: boolean; error: { code: string; message: string; requestId: string } } {
  return { success: false, error: { code, message, requestId } }
}

// ============================================================
// Project Schemas (exported as const for runtime + type)
// ============================================================

export const projectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workspaceId: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  status: z.enum(['active', 'archived']).default('active'),
  repositoryUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  workspaceId: z.string().optional(),
})

export const projectListSchema = z.object({
  projects: z.array(projectSchema),
  total: z.number(),
})

// ============================================================
// AI Chat Schemas
// ============================================================

export const aiChatRequestSchema = z.object({
  conversationId: z.string(),
  messages: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  })),
})

export const aiChatResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    message: z.object({
      content: z.string(),
    }),
  }).optional(),
  error: z.object({
    message: z.string(),
  }).optional(),
})

// ============================================================
// Health Schema
// ============================================================

export const healthSchema = z.object({
  status: z.enum(['ok', 'error']),
  database: z.boolean(),
  uptime: z.number(),
})

// ============================================================
// Auth User Schema (Better Auth types)
// ============================================================

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  picture: z.string().optional(),
  role: z.string().optional(),
  permissions: z.array(z.string()),
  created_at: z.date(),
  updated_at: z.date(),
})

// ============================================================
// Audit Schemas
// ============================================================

export const agentDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  status: z.enum(['available', 'unavailable']),
  version: z.string(),
})

export const auditFindingSchema = z.object({
  id: z.string(),
  type: z.string(),
  message: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['open', 'resolved']),
  createdAt: z.date(),
})

export const evidenceRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  uri: z.string(),
  checksum: z.string(),
  metadata: z.record(z.unknown()),
  createdAt: z.date(),
})

export const readinessScoreSchema = z.object({
  score: z.number(),
  max: z.number().default(100),
  architecture: z.number(),
  code: z.number(),
  security: z.number(),
  performance: z.number(),
})

// ============================================================
// Inferred Types (for type-safe usage without ._type)
// ============================================================

export type Project = z.infer<typeof projectSchema>
export type CreateProject = z.infer<typeof createProjectSchema>
export type ProjectList = z.infer<typeof projectListSchema>

export type AiChatRequest = z.infer<typeof aiChatRequestSchema>
export type AiChatResponse = z.infer<typeof aiChatResponseSchema>

export type Health = z.infer<typeof healthSchema>

export type AuthUser = z.infer<typeof authUserSchema>

export type AgentDefinition = z.infer<typeof agentDefinitionSchema>
export type AuditFinding = z.infer<typeof auditFindingSchema>
export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>
export type ReadinessScore = z.infer<typeof readinessScoreSchema>