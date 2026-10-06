import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/security
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockSecurity = [
    {
      id: "security-1",
      type: "secret",
    },
  ];

  return res.json({
    success: true,
    data: mockSecurity,
  });
});

// GET /api/v1/security/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockSecurity = {
    id,
    type: "secret",
  };

  return res.json({
    success: true,
    data: mockSecurity,
  });
});

// POST /api/v1/security
router.post("/", (req: Request, res: Response) => {
  const { type, target } = req.body;

  if (!type || !target) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Tipo e target são obrigatórios",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockSecurity = {
    id: `security-${Date.now()}`,
    type,
    target,
  };

  return res.status(201).json({
    success: true,
    data: mockSecurity,
  });
});

export default router;