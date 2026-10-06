import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/vision
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockVision = [
    {
      id: "vision-1",
      type: "analysis",
    },
  ];

  return res.json({
    success: true,
    data: mockVision,
  });
});

// GET /api/v1/vision/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockVision = {
    id,
    type: "analysis",
  };

  return res.json({
    success: true,
    data: mockVision,
  });
});

// POST /api/v1/vision
router.post("/", (req: Request, res: Response) => {
  const { type, input_uri } = req.body;

  if (!type || !input_uri) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Tipo e input_uri são obrigatórios",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockVision = {
    id: `vision-${Date.now()}`,
    type,
    input_uri,
  };

  return res.status(201).json({
    success: true,
    data: mockVision,
  });
});

export default router;