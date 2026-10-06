import express from "express"
import cors from "cors"
import gitRoutes from "./routes/git.js"
import { requireUser } from "./auth.js"
import { initializeDatabase } from "./db.js"

const app = express()
const port = Number(process.env.PORT ?? 4000)

app.disable("x-powered-by")
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(",") ?? true }))
app.use(express.json({ limit: "1mb" }))

app.get("/health", (_req, res) => res.json({ ok: true, service: "noteagents-api" }))
app.use("/api/git", requireUser, gitRoutes)
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : "Erro interno do servidor"
  const status = message.includes("não encontrado") ? 404 : message.includes("inválid") ? 400 : 500
  if (status === 500) console.error("[api]", error)
  res.status(status).json({ error: message })
})

initializeDatabase()
  .then(() => app.listen(port, () => console.log(`[api] ouvindo na porta ${port}`)))
  .catch((error) => { console.error("[api] falha ao inicializar banco", error); process.exit(1) })

export default app
