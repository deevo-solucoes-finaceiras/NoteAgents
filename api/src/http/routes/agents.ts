import { Router, Request, Response } from "express"
import { z } from "zod"
import { pool } from "../../database"
import { agentDefinitionSchema } from "@noteagents/contracts"

const router = Router()

// GET /api/v1/agents
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, description, capabilities, status, version, created_at FROM agents ORDER BY created_at DESC`
    )

    return res.json({
      success: true,
      data: rows,
    })
  } catch (err) {
    console.error('Erro ao listar agentes:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível listar agentes',
        timestamp: Date.now(),
      },
    })
  }
})

// GET /api/v1/agents/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(
      `SELECT id, name, description, capabilities, status, version, created_at FROM agents WHERE id = $1`,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "AGENT_NOT_FOUND",
          message: 'Agente não encontrado',
          timestamp: Date.now(),
        },
      })
    }

    return res.json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao buscar agente:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível buscar o agente',
        timestamp: Date.now(),
      },
    })
  }
})

// POST /api/v1/agents
router.post("/", async (req: Request, res: Response) => {
  const agentSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    capabilities: z.array(z.string()).optional(),
    status: z.enum(['available', 'unavailable']).default('available'),
    version: z.string().optional(),
  })

  const result = agentSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: result.error.errors.map((e) => e.message).join(", "),
        timestamp: Date.now(),
      },
    })
  }

  const { name, description, capabilities, status, version } = result.data

  try {
    const { rows } = await pool.query(
      `INSERT INTO agents (name, description, capabilities, status, version, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'user-1', NOW(), NOW())
       RETURNING id, name, description, capabilities, status, version, created_at, updated_at`,
      [name, description, capabilities, status, version]
    )

    return res.status(201).json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao criar agente:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível criar o agente',
        timestamp: Date.now(),
      },
    })
  } finally {
    // Note: client released in a higher scope or here
  }
})

// POST /api/v1/agents/:id/run
router.post("/:id/run", async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(
      `INSERT INTO runs (agent_id, status, started_at, input)
       VALUES ($1, 'pending', NOW(), '{}')
       RETURNING id, agent_id, status, started_at, input`
    )

    return res.status(201).json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao iniciar execução do agente:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível iniciar a execução do agente',
        timestamp: Date.now(),
      },
    })
  }
})

// POST /api/v1/agents/:id/stop
router.post("/:id/stop", async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(
      `UPDATE agents SET status = 'idle' WHERE id = $1 RETURNING id, name, status`,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "AGENT_NOT_FOUND",
          message: 'Agente não encontrado',
          timestamp: Date.now(),
        },
      })
    }

    return res.json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao parar agente:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível parar o agente',
        timestamp: Date.now(),
      },
    })
  }
})

export default router