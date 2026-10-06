import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/tests
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockTests = [
    {
      id: "test-1",
      name: "Teste de Unidade",
      status: "pending",
    },
  ];

  return res.json({
    success: true,
    data: mockTests,
  });
});

// GET /api/v1/tests/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockTest = {
    id,
    name: "Teste de Unidade",
    status: "pending",
  };

  return res.json({
    success: true,
    data: mockTest,
  });
});

// POST /api/v1/tests
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
  const mockTest = {
    id: `test-${Date.now()}`,
    name,
    status: "pending",
  };

  return res.status(201).json({
    success: true,
    data: mockTest,
  });
});

export default router;