import { Router, Request, Response } from "express"
import { pool } from "../../database"

const router = Router()

// GET /api/v1/evidence
router.get("/", async (req: Request, res: Response) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, type, source, related_id, related_type, content, created_at, updated_at
      FROM evidence
      ORDER BY created_at DESC
    `)
    return res.json({
      success: true,
      data: result.rows,
    })
  } catch (err) {
    console.error("Erro ao listar evidências:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao buscar evidências",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

// GET /api/v1/evidence/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, type, source, related_id, related_type, content, created_at, updated_at
      FROM evidence
      WHERE id = $1
    `, [id])
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Evidência não encontrada",
          timestamp: Date.now(),
        },
      })
    }
    return res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (err) {
    console.error("Erro ao buscar evidência:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao buscar evidência",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

// POST /api/v1/evidence
router.post("/", async (req: Request, res: Response) => {
  const { type, source, related_id, related_type, content } = req.body

  if (!type || !source || !related_id) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Tipo, fonte e ID relacionado são obrigatórios",
        timestamp: Date.now(),
      },
    })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO evidence (type, source, related_id, related_type, content, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, type, source, related_id, related_type, content, created_at, updated_at`,
      [type, source, related_id, related_type, content || null]
    )
    return res.status(201).json({
      success: true,
      data: result.rows[0],
    })
  } catch (err) {
    console.error("Erro ao criar evidência:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao criar evidência",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

export default router