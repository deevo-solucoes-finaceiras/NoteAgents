import { Router, Request, Response } from "express"
import { pool } from "../../database"
import { createReadinessSchemas } from "@noteagents/contracts"

const router = Router()

// Helper to check database health
async function checkDatabaseHealth(): Promise<{ healthy: boolean; message: string }> {
  try {
    const client = await pool.connect()
    try {
      await client.query(`SELECT 1`)
      return { healthy: true, message: "Database connection OK" }
    } finally {
      client.release()
    }
  } catch (err) {
    return { healthy: false, message: `Database error: ${(err as Error).message}` }
  }
}

// Helper to check API health
async function checkApiHealth(): Promise<{ healthy: boolean; message: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/health`, {
      method: 'GET',
      timeout: 5000,
    })
    if (response.ok) {
      return { healthy: true, message: "API responding" }
    }
    return { healthy: false, message: `API returned ${response.status}` }
  } catch (err) {
    return { healthy: false, message: `API unreachable: ${(err as Error).message}` }
  }
}

// GET /api/v1/readiness
router.get("/", async (req: Request, res: Response) => {
  try {
    const [dbHealth, apiHealth] = await Promise.all([
      checkDatabaseHealth(),
      checkApiHealth(),
    ])

    const categories = {
      database: dbHealth.healthy ? "healthy" : "unhealthy",
      api: apiHealth.healthy ? "healthy" : "unhealthy",
      storage: "healthy", // placeholder - could check Redis/R2 etc
    }

    // Calculate overall score based on healthy categories
    const healthyCount = Object.values(categories).filter(
      (c) => c === "healthy"
    ).length
    const score = Math.round((healthyCount / Object.keys(categories).length) * 100)

    const data = {
      state: healthyCount === Object.keys(categories).length ? "READY" : "WARNING",
      score,
      categories,
      last_checked: Date.now(),
    }

    return res.json({
      success: true,
      data,
    })
  } catch (err) {
    console.error("Erro ao verificar readiness:", err)
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Erro ao verificar readiness",
        timestamp: Date.now(),
      },
    })
  }
})

// GET /api/v1/readiness/:component
router.get("/:component", async (req: Request, res: Response) => {
  const { component } = req.params

  // Check specific component health
  let healthy = false
  let message = ""

  switch (component) {
    case "database":
      const dbHealth = await checkDatabaseHealth()
      healthy = dbHealth.healthy
      message = dbHealth.message
      break
    case "api":
      const apiHealth = await checkApiHealth()
      healthy = apiHealth.healthy
      message = apiHealth.message
      break
    default:
      healthy = false
      message = "Componente desconhecido"
  }

  return res.json({
    success: true,
    data: {
      state: healthy ? "HEALTHY" : "UNHEALTHY",
      score: healthy ? 100 : 0,
      categories: {
        [component]: healthy ? "healthy" : "unhealthy",
      },
      last_checked: Date.now(),
    },
  })
})

export default router