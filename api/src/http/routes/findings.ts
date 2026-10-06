import { Router, Request, Response } from "express";

const router = Router();

// GET /api/v1/findings
router.get("/", (req: Request, res: Response) => {
  // TODO: Real implementation with DB query
  const mockFindings = [
    {
      id: "finding-1",
      title: "Senha hardcoded detectada",
      description: "Senha hardcoded encontrada no arquivo config.yaml",
      severity: "critical",
      status: "open",
      category: "security",
      created_at: Date.now(),
    },
  ];

  return res.json({
    success: true,
    data: mockFindings,
  });
});

// GET /api/v1/findings/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Real implementation with DB query
  const mockFinding = {
    id,
    title: "Senha hardcoded detectada",
    description: "Senha hardcoded encontrada no arquivo config.yaml",
    severity: "critical",
    status: "open",
    category: "security",
    created_at: Date.now(),
  };

  return res.json({
    success: true,
    data: mockFinding,
  });
});

// POST /api/v1/findings
router.post("/", (req: Request, res: Response) => {
  const { title, description, severity } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Título é obrigatório",
        timestamp: Date.now(),
      },
    });
  }

  // TODO: Real implementation with DB insert
  const mockFinding = {
    id: `finding-${Date.now()}`,
    title,
    description,
    severity: severity || "medium",
    status: "open",
    category: "security",
    created_at: Date.now(),
  };

  return res.status(201).json({
    success: true,
    data: mockFinding,
  });
});

// PATCH /api/v1/findings/:id
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  // TODO: Real implementation with DB update
  const mockFinding = {
    id,
    status: status || "open",
    updated_at: Date.now(),
  };

  return res.json({
    success: true,
    data: mockFinding,
  });
});

export default router;