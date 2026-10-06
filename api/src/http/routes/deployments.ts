import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/deployments
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockDeployments = [
    {
      id: "deploy-1",
      name: "Produção",
      status: "active",
    },
  ];

  return res.json({
    success: true,
    data: mockDeployments,
  });
});

// GET /api/v1/deployments/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockDeployment = {
    id,
    name: "Produção",
    status: "active",
  };

  return res.json({
    success: true,
    data: mockDeployment,
  });
});

// POST /api/v1/deployments
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
  const mockDeployment = {
    id: `deploy-${Date.now()}`,
    name,
    status: "pending",
  };

  return res.status(201).json({
    success: true,
    data: mockDeployment,
  });
});

export default router;