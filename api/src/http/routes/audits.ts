import { Router, Request, Response } from "express"
import { pool } from "../../database"

const router = Router()

// GET /api/v1/audits
router.get("/", async (req: Request, res: Response) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, name, description, severity, status,
             total_findings, resolved_findings, created_at, updated_at
      FROM audits
      ORDER BY created_at DESC
    `)
    return res.json({
      success: true,
      data: result.rows,
    })
  } catch (err) {
    console.error("Erro ao listar audites:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao buscar audites",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

// GET /api/v1/audits/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, name, description, severity, status,
             total_findings, resolved_findings, created_at, updated_at
      FROM audits
      WHERE id = $1
    `, [id])
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Audite não encontrado",
          timestamp: Date.now(),
        },
      })
    }
    return res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (err) {
    console.error("Erro ao buscar audite:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao buscar audite",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

// POST /api/v1/audits
router.post("/", async (req: Request, res: Response) => {
  const { title, description, severity } = req.body

  if (!title) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Título é obrigatório",
        timestamp: Date.now(),
      },
    })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO audits (name, description, severity, status, total_findings, resolved_findings, created_at, updated_at)
       VALUES ($1, $2, $3, 'open', 0, 0, NOW(), NOW())
       RETURNING id, name, description, severity, status, total_findings, resolved_findings, created_at, updated_at`,
      [title, description || null, severity || "medium"]
    )
    return res.status(201).json({
      success: true,
      data: result.rows[0],
    })
  } catch (err) {
    console.error("Erro ao criar audite:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao criar audite",
        timestamp: Date.now(),
      },
    })
  } finally {
    client.release()
  }
})

export default router