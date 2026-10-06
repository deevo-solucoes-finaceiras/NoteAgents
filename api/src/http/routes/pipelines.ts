import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/pipelines
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockPipelines = [
    {
      id: "pipeline-1",
      name: "Deploy Pipeline",
      status: "pending",
      stages: [
        { id: "stage-1", name: "Build", status: "pending", order: 1 },
        { id: "stage-2", name: "Test", status: "pending", order: 2 },
        { id: "stage-3", name: "Deploy", status: "pending", order: 3 },
      ],
      created_at: Date.now(),
    },
  ];

  return res.json({
    success: true,
    data: mockPipelines,
  });
});

// GET /api/v1/pipelines/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockPipeline = {
    id,
    name: "Deploy Pipeline",
    status: "pending",
    stages: [
      { id: "stage-1", name: "Build", status: "pending", order: 1 },
      { id: "stage-2", name: "Test", status: "pending", order: 2 },
      { id: "stage-3", name: "Deploy", status: "pending", order: 3 },
    ],
    created_at: Date.now(),
  };

  return res.json({
    success: true,
    data: mockPipeline,
  });
});

// POST /api/v1/pipelines
router.post("/", (req: Request, res: Response) => {
  const { name, description, stages } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Nome do pipeline é obrigatório",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockPipeline = {
    id: `pipeline-${Date.now()}`,
    name,
    description,
    status: "pending",
    stages: stages || [],
    created_at: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockPipeline,
  });
});

// POST /api/v1/pipelines/:id/run
router.post("/:id/run", (req: Request, res: Response) => {
  const { id } = req.params;
  const { input } = req.body;

  // TODO: Real implementation with pipeline execution
  const mockRun = {
    run_id: `run-${Date.now()}`,
    pipeline_id: id,
    status: "pending",
    input,
    created_at: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockRun,
  });
});

export default router;