import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/lsp
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockLSP = [
    {
      id: "lsp-1",
      name: "TypeScript Server",
      language: "typescript",
      status: "online",
    },
  ];

  return res.json({
    success: true,
    data: mockLSP,
  });
});

// GET /api/v1/lsp/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockLSP = {
    id,
    name: "TypeScript Server",
    language: "typescript",
    status: "online",
  };

  return res.json({
    success: true,
    data: mockLSP,
  });
});

// POST /api/v1/lsp
router.post("/", (req: Request, res: Response) => {
  const { name, language, command } = req.body;

  if (!name || !language) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome e linguagem são obrigatórios",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockLSP = {
    id: `lsp-${Date.now()}`,
    name,
    language,
    command,
    status: "online",
  };

  return res.status(201).json({
    success: true,
    data: mockLSP,
  });
});

export default router;