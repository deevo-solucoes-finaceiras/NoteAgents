import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/chat
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockChat = [
    {
      id: "chat-1",
      name: "Sessão Principal",
    },
  ];

  return res.json({
    success: true,
    data: mockChat,
  });
});

// GET /api/v1/chat/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockChat = {
    id,
    name: "Sessão Principal",
  };

  return res.json({
    success: true,
    data: mockChat,
  });
});

// POST /api/v1/chat
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
  const mockChat = {
    id: `chat-${Date.now()}`,
    name,
  };

  return res.status(201).json({
    success: true,
    data: mockChat,
  });
});

export default router;