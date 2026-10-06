import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/mcp
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockMCP = [
    {
      id: "mcp-1",
      name: "GitHub Actions",
      type: "command",
      status: "online",
      last_connected: Date.now(),
    },
  ];

  return res.json({
    success: true,
    data: mockMCP,
  });
});

// GET /api/v1/mcp/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockMCP = {
    id,
    name: "GitHub Actions",
    type: "command",
    status: "online",
    last_connected: Date.now(),
  };

  return res.json({
    success: true,
    data: mockMCP,
  });
});

// POST /api/v1/mcp
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
  const mockMCP = {
    id: `mcp-${Date.now()}`,
    name,
    type,
    status: "online",
    last_connected: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockMCP,
  });
});

export default router;