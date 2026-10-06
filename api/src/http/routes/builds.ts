import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/builds
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockBuilds = [
    {
      id: "build-1",
      name: "Build Alpha",
      status: "completed",
    },
  ];

  return res.json({
    success: true,
    data: mockBuilds,
  });
});

// GET /api/v1/builds/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockBuild = {
    id,
    name: "Build Alpha",
    status: "completed",
  };

  return res.json({
    success: true,
    data: mockBuild,
  });
});

// POST /api/v1/builds
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
  const mockBuild = {
    id: `build-${Date.now()}`,
    name,
    status: "pending",
  };

  return res.status(201).json({
    success: true,
    data: mockBuild,
  });
});

export default router;