import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/tasks
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockTasks = [
    {
      id: "task-1",
      name: "Revisar pull request",
      status: "pending",
      agent_id: "agent-1",
      progress: 0,
      created_at: Date.now(),
    },
  ];

  return res.json({
    success: true,
    data: mockTasks,
  });
});

// GET /api/v1/tasks/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockTask = {
    id,
    name: "Revisar pull request",
    status: "pending",
    agent_id: "agent-1",
    progress: 0,
    created_at: Date.now(),
  };

  return res.json({
    success: true,
    data: mockTask,
  });
});

// POST /api/v1/tasks
router.post("/", (req: Request, res: Response) => {
  const { name, agent_id } = req.body;

  if (!name || !agent_id) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome do agente é obrigatório",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockTask = {
    id: `task-${Date.now()}`,
    name,
    status: "pending",
    agent_id,
    progress: 0,
    created_at: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockTask,
  });
});

// PATCH /api/v1/tasks/:id
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, progress, output, error } = req.body;

  // TODO: Real implementation with DB update
  const mockTask = {
    id,
    status: status || "pending",
    progress: progress ?? 0,
    output,
    error,
    updated_at: Date.now(),
  };

  return res.json({
    success: true,
    data: mockTask,
  });
});

export default router;