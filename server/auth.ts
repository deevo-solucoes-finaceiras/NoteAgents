import type { NextFunction, Request, Response } from "express"

export type AuthenticatedRequest = Request & { userId: string }

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("x-user-id")?.trim()
  if (!userId) {
    res.status(401).json({ error: "Autenticação necessária" })
    return
  }
  if (!/^[a-zA-Z0-9._:@-]{1,128}$/.test(userId)) {
    res.status(400).json({ error: "Identificador de usuário inválido" })
    return
  }
  ;(req as AuthenticatedRequest).userId = userId
  next()
}

export function getUserId(req: Request) {
  return (req as AuthenticatedRequest).userId
}
