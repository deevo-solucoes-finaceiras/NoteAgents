import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../database";
import { authRouter } from "../http/routes/auth";
import { projectsRouter } from "../http/routes/projects";
import { agentsRouter } from "../http/routes/agents";
import { tasksRouter } from "../http/routes/tasks";
import { pipelinesRouter } from "../http/routes/pipelines";
import { runsRouter } from "../http/routes/runs";
import { auditsRouter } from "../http/routes/audits";
import { findingsRouter } from "../http/routes/findings";
import { evidenceRouter } from "../http/routes/evidence";
import { readinessRouter } from "../http/routes/readiness";
import { observerRouter } from "../http/routes/observer";
import { mcpRouter } from "../http/routes/mcp";
import { lspRouter } from "../http/routes/lsp";
import { opencodeRouter } from "../http/routes/opencode";
import { knowledgeRouter } from "../http/routes/knowledge";
import { sourcesRouter } from "../http/routes/sources";
import { chatRouter } from "../http/routes/chat";
import { visionRouter } from "../http/routes/vision";
import { securityRouter } from "../http/routes/security";
import { deploymentsRouter } from "../http/routes/deployments";
import { testsRouter } from "../http/routes/tests";
import { buildsRouter } from "../http/routes/builds";
import { evolutionRouter } from "../http/routes/evolution";
import { settingsRouter } from "../http/routes/settings";

const app = express();

app.use(express.json());

// Health check
app.get("/api/v1/health", (_req: Request, _res: Response) => {
  return Response.json({ status: "ok", timestamp: Date.now() });
});

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/agents", agentsRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/pipelines", pipelinesRouter);
app.use("/api/v1/runs", runsRouter);
app.use("/api/v1/audits", auditsRouter);
app.use("/api/v1/findings", findingsRouter);
app.use("/api/v1/evidence", evidenceRouter);
app.use("/api/v1/readiness", readinessRouter);
app.use("/api/v1/observer", observerRouter);
app.use("/api/v1/mcp", mcpRouter);
app.use("/api/v1/lsp", lspRouter);
app.use("/api/v1/opencode", opencodeRouter);
app.use("/api/v1/knowledge", knowledgeRouter);
app.use("/api/v1/sources", sourcesRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/vision", visionRouter);
app.use("/api/v1/security", securityRouter);
app.use("/api/v1/deployments", deploymentsRouter);
app.use("/api/v1/tests", testsRouter);
app.use("/api/v1/builds", buildsRouter);
app.use("/api/v1/evolution", evolutionRouter);
app.use("/api/v1/settings", settingsRouter);

// Error handling middleware
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
        timestamp: Date.now(),
      },
    });
  }
);

export { app };