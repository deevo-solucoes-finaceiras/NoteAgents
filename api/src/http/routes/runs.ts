import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/runs
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockRuns = [
    {
      id: "run-1",
      pipeline_id: "pipeline-1",
      status: "completed",
      progress: 100,
      created_at: Date.now() - 86400000,
    },
  ];

  return res.json({
    success: true,
    data: mockRuns,
  });
});

// GET /api/v1/runs/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockRun = {
    id,
    pipeline_id: "pipeline-1",
    status: "completed",
    progress: 100,
    created_at: Date.now() - 86400000,
  };

  return res.json({
    success: true,
    data: mockRun,
  });
});

// POST /api/v1/runs
router.post("/", (req: Request, res: Response) => {
  const { pipeline_id } = req.body;

  if (!pipeline_id) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "ID do pipeline é obrigatório",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockRun = {
    id: `run-${Date.now()}`,
    pipeline_id,
    status: "pending",
    progress: 0,
    created_at: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockRun,
  });
});

// POST /api/v1/runs/:id/stop
router.post("/:id/stop", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with run stop
  return res.json({
    success: true,
    data: {
      success: true,
      message: "Run parado",
    },
  });
});

export default router;