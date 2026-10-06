import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/knowledge
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockKnowledge = [
    {
      id: "knowledge-1",
      name: "Documentação API",
      type: "file",
    },
  ];

  return res.json({
    success: true,
    data: mockKnowledge,
  });
});

// GET /api/v1/knowledge/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockKnowledge = {
    id,
    name: "Documentação API",
    type: "file",
  };

  return res.json({
    success: true,
    data: mockKnowledge,
  });
});

// POST /api/v1/knowledge
router.post("/", (req: Request, res: Response) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome e tipo são obrigatórios",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockKnowledge = {
    id: `knowledge-${Date.now()}`,
    name,
    type,
  };

  return res.status(201).json({
    success: true,
    data: mockKnowledge,
  });
});

export default router;