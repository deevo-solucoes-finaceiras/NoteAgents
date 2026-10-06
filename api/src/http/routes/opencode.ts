import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/opencode
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockOpencode = [
    {
      id: "opencode-1",
      name: "OpenCode Session",
      status: "active",
    },
  ];

  return res.json({
    success: true,
    data: mockOpencode,
  });
});

// GET /api/v1/opencode/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockOpencode = {
    id,
    name: "OpenCode Session",
    status: "active",
  };

  return res.json({
    success: true,
    data: mockOpencode,
  });
});

// POST /api/v1/opencode
router.post("/", (req: Request, res: Response) => {
  const { name, working_directory } = req.body;

  if (!name || !working_directory) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome e diretório de trabalho são obrigatórios",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockOpencode = {
    id: `opencode-${Date.now()}`,
    name,
    working_directory,
    status: "active",
  };

  return res.status(201).json({
    success: true,
    data: mockOpencode,
  });
});

export default router;