import { Router } from "express"
import { z } from "zod"
import { createRepository, findRepository, listRepositories, removeRepository, touchRepository } from "../db.js"
import { getUserId } from "../auth.js"
import { cloneRepository, commitRepository, getRepositoryStatus, pullRepository, pushRepository, removeRepositoryWorkspace } from "../git-service.js"

const router = Router()
const nameSchema = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/)
const cloneSchema = z.object({ name: nameSchema, remoteUrl: z.string().url() })
const commitSchema = z.object({ message: z.string().trim().min(1).max(200) })

router.get("/", async (req, res, next) => {
  try { res.json({ repositories: await listRepositories(getUserId(req)) }) } catch (error) { next(error) }
})

router.post("/clone", async (req, res, next) => {
  try {
    const input = cloneSchema.parse(req.body)
    const userId = getUserId(req)
    if (await findRepository(userId, input.name)) return res.status(409).json({ error: "Repositório já cadastrado" })
    const status = await cloneRepository(userId, input.name, input.remoteUrl)
    const repository = await createRepository({ user_id: userId, name: input.name, remote_url: input.remoteUrl, local_path: `server/workspaces/${userId}/${input.name}`, default_branch: status.branch })
    res.status(201).json({ repository, status })
  } catch (error) { next(error) }
})

router.get("/:name/status", async (req, res, next) => {
  try { const name = nameSchema.parse(req.params.name); if (!await findRepository(getUserId(req), name)) return res.status(404).json({ error: "Repositório não encontrado" }); res.json({ status: await getRepositoryStatus(getUserId(req), name) }) } catch (error) { next(error) }
})

router.post("/:name/pull", async (req, res, next) => {
  try { const name = nameSchema.parse(req.params.name); if (!await findRepository(getUserId(req), name)) return res.status(404).json({ error: "Repositório não encontrado" }); const result = await pullRepository(getUserId(req), name); await touchRepository(getUserId(req), name); res.json(result) } catch (error) { next(error) }
})

router.post("/:name/commit", async (req, res, next) => {
  try { const name = nameSchema.parse(req.params.name); const input = commitSchema.parse(req.body); if (!await findRepository(getUserId(req), name)) return res.status(404).json({ error: "Repositório não encontrado" }); const result = await commitRepository(getUserId(req), name, input.message); await touchRepository(getUserId(req), name); res.json(result) } catch (error) { next(error) }
})

router.post("/:name/push", async (req, res, next) => {
  try { const name = nameSchema.parse(req.params.name); if (!await findRepository(getUserId(req), name)) return res.status(404).json({ error: "Repositório não encontrado" }); const result = await pushRepository(getUserId(req), name); await touchRepository(getUserId(req), name); res.json(result) } catch (error) { next(error) }
})

router.delete("/:name", async (req, res, next) => {
  try { const name = nameSchema.parse(req.params.name); const userId = getUserId(req); if (!await findRepository(userId, name)) return res.status(404).json({ error: "Repositório não encontrado" }); await removeRepositoryWorkspace(userId, name); await removeRepository(userId, name); res.status(204).end() } catch (error) { next(error) }
})

export default router
