import { Router, Request, Response } from "express"
import { createProjectSchema } from '@noteagents/contracts'
import { pool } from '../../database'

const router = Router()

// POST /api/v1/projects
router.post("/", async (req: Request, res: Response) => {
  const result = createProjectSchema.safeParse(req.body)

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

  const { name, description, workspaceId } = result.data

  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO projects (name, description, workspace_id, user_id, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'active', NOW(), NOW())
       RETURNING id, name, description, status, created_at, updated_at`,
      [name, description, workspaceId, 'user-1']
    )

    return res.status(201).json({
      success: true,
      data: result.rows[0],
    })
  } catch (err) {
    console.error('Erro ao criar projeto:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível criar o projeto',
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

// GET /api/v1/projects
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, description, status, created_at, updated_at FROM projects ORDER BY created_at DESC`
    )

    return res.json({
      success: true,
      data: rows,
    })
  } catch (err) {
    console.error('Erro ao listar projetos:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível carregar projetos',
        timestamp: Date.now(),
      },
    })
  }
})

// GET /api/v1/projects/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(
      `SELECT id, name, description, status, created_at, updated_at FROM projects WHERE id = $1`,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "PROJECT_NOT_FOUND",
          message: 'Projeto não encontrado',
          timestamp: Date.now(),
        },
      })
    }

    return res.json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao buscar projeto:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível buscar o projeto',
        timestamp: Date.now(),
      },
    })
  }
})

// PATCH /api/v1/projects/:id
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const result = createProjectSchema.safeParse(req.body)

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

  const { name, description } = result.data

  try {
    const { rows } = await pool.query(
      `UPDATE projects SET name = $1, description = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, name, description, status, created_at, updated_at`,
      [name, description, id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "PROJECT_NOT_FOUND",
          message: 'Projeto não encontrado',
          timestamp: Date.now(),
        },
      })
    }

    return res.json({
      success: true,
      data: rows[0],
    })
  } catch (err) {
    console.error('Erro ao atualizar projeto:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível atualizar o projeto',
        timestamp: Date.now(),
      },
    })
  }
})

// DELETE /api/v1/projects/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(
      `DELETE FROM projects WHERE id = $1 RETURNING id`,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "PROJECT_NOT_FOUND",
          message: 'Projeto não encontrado',
          timestamp: Date.now(),
        },
      })
    }

    return res.json({
      success: true,
      data: null,
    })
  } catch (err) {
    console.error('Erro ao excluir projeto:', err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: 'Não foi possível excluir o projeto',
        timestamp: Date.now(),
      },
    })
  }
})

export default router