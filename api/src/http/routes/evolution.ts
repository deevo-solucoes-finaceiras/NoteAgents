import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/evolution
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockEvolution = [
    {
      id: "evolution-1",
      name: "Análise de Padrão",
      status: "pending",
    },
  ];

  return res.json({
    success: true,
    data: mockEvolution,
  });
});

// GET /api/v1/evolution/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockEvolution = {
    id,
    name: "Análise de Padrão",
    status: "pending",
  };

  return res.json({
    success: true,
    data: mockEvolution,
  });
});

// POST /api/v1/evolution
router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome é obrigatório",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockEvolution = {
    id: `evolution-${Date.now()}`,
    name,
    status: "pending",
  };

  return res.status(201).json({
    success: true,
    data: mockEvolution,
  });
});

export default router;