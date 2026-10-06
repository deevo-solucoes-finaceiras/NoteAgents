import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/sources
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockSources = [
    {
      id: "source-1",
      name: "Git Repository",
      type: "git",
    },
  ];

  return res.json({
    success: true,
    data: mockSources,
  });
});

// GET /api/v1/sources/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockSource = {
    id,
    name: "Git Repository",
    type: "git",
  };

  return res.json({
    success: true,
    data: mockSource,
  });
});

// POST /api/v1/sources
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
  const mockSource = {
    id: `source-${Date.now()}`,
    name,
    type,
  };

  return res.status(201).json({
    success: true,
    data: mockSource,
  });
});

export default router;