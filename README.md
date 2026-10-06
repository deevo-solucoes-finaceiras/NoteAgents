# NoteAgents

## Autonomous Engineering Agent Runtime

**NoteAgents** is a distributed engineering agent platform that coordinates AI-assisted development, analysis, auditing, testing, documentation, observability, and evolution of software projects.

The platform integrates CLI, Core runtime, Agents, Skills, MCP, LSP, Providers, Database, GitHub, and Web Applications into a unified system for engineering excellence.

---

## 📦 Primary Repository

This is the **core ecosystem** repository containing:

- **packages/** - Shared packages (contracts, orchestration, providers, types, UI, vision, knowledge, audit, evidence, readiness, workspace)
- **apps/api/** - API backend service
- **server/** - Server infrastructure and Git operations

---

## 🌐 Ecosystem Repositories

NoteAgents consists of four integrated but independent repositories:

| Repository | Purpose |
|------------|---------|
| **[NoteAgents](https://github.com/deevo-solucoes-finaceiras/NoteAgents)** | Core + CLI + Runtime + Orchestration |
| **[NoteAgents-administrativo](https://github.com/viniamaral2026-cpu/NoteAgents-administrativo)** | Administrative dashboard |
| **[Noteagents-dev](https://github.com/deevo-solucoes-finaceiras/Noteagents-dev)** | Developer tools + CLI + Agent Runtime |
| **[NoteAgents-comunidade](https://github.com/deevo-solucoes-finaceiras/NoteAgents-comunidade)** | Community features |

---

## 🏗️ Architecture

```
NoteAgents (Core + CLI + Runtime)
       │
       ├─→ NoteAgents-administrativo (Admin Panel)
       ├─→ Noteagents-dev (Developer Platform)
       └─→ NoteAgents-comunidade (Community)
```

---

## 🚀 Quick Start

```bash
# Clone the primary repository
git clone https://github.com/deevo-solucoes-finaceiras/NoteAgents.git
cd NoteAgents

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start the development server
pnpm dev:server

# Run the CLI
noteagents --help
```

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages and applications |
| `pnpm dev` | Start development mode (web app) |
| `pnpm dev:server` | Start development server |
| `pnpm start:server` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm audit` | Run security audit |

---

## 📁 Repository Structure

```
NoteAgents/
├── AGENTS.md              # Agent definitions
├── ARCHITECTURE.md        # System architecture
├── GOVERNANCE.md          # Governance policies
├── CHANGELOG.md           # Version change log
├── README.md              # This file
├── AUDIT_REPORT.md        # Audit report
├── BACKEND_AUDIT.md       # Backend audit
├── DATABASE_AUDIT.md      # Database audit
├── FRONTEND_AUDIT.md      # Frontend audit
├── IMPLEMENTATION_PLAN.md # Implementation plan
├── NOTEAGENTS-SYSTEM-SPECIFICATION.md  # System specification
├── ARCHITECTURAL-FREEZE-1.0.md  # Architectural freeze
├── docs/                  # Documentation directory
│   ├── architecture/      # Architecture docs
│   ├── governance/        # Governance docs
│   ├── operations/        # Operations docs
│   ├── state/             # State tracking docs
│   └── implementation/    # Implementation docs
├── packages/              # Shared packages
│   ├── contracts/         # Zod contracts
│   ├── orchestration/     # Agent runtime
│   ├── providers/         # LLM providers
│   ├── types/             # Type definitions
│   ├── ui/                # UI components
│   ├── vision/            # Vision/OCR
│   ├── knowledge/         # Knowledge base
│   ├── audit/             # Audit modules
│   ├── evidence/          # Evidence system
│   ├── readiness/         # Readiness checks
│   └── workspace/         # Workspace management
├── agents/                # Agent implementations
│   ├── reviewer/          # Code reviewer agent
│   ├── error-fixer/       # Error fixing agent
│   ├── testing/           # Testing agent
│   └── ...                # More agents
├── apps/                  # Applications
│   ├── api/               # API backend
│   ├── web/               # Web interface
│   ├── cli/               # CLI tool
│   ├── agent-runtime/     # Agent runtime
│   └── ...                # More apps
├── mcps/                  # MCP servers (30+)
├── scripts/               # Project scripts
├── infrastructure/        # Infra configuration
└── tests/                 # Test suites
```

---

## 🔧 Technology Stack

- **Runtime**: Node.js 20+
- **Package Manager**: pnpm 10+
- **TypeScript**: strict mode
- **Framework**: Next.js 14
- **Database**: PostgreSQL (Neon), Firebase, Redis
- **CLI**: Custom CLI with agent runtime
- **MCP**: 30+ Model Context Protocol servers
- **LSP**: Language Server Protocol integration
- **Agents**: Reviewer, Error Fixer, Testing, and more
- **Skills**: Analyze repository, inspect database, run tests, and more

---

## 📜 License

The license definitive must be defined before the first public release.

See `LICENSE` for when available.

---

## 🤝 Contributing

Contributions are welcome. Please read the following before contributing:

- `GOVERNANCE.md` - Governance policies
- `CONTRIBUTING.md` - Contributing guidelines
- `SECURITY.md` - Security policies

See `ARCHITECTURAL-FREEZE-1.0.md` for architectural decisions that must be followed.

---

## 📞 Ecosystem Links

- **NoteAgents (Core)**: https://github.com/deevo-solucoes-finaceiras/NoteAgents
- **NoteAgents Administrativo**: https://github.com/viniamaral2026-cpu/NoteAgents-administrativo
- **NoteAgents Dev**: https://github.com/deevo-solucoes-finaceiras/Noteagents-dev
- **NoteAgents Community**: https://github.com/deevo-solucoes-finaceiras/NoteAgents-comunidade

---

## 📖 Related Documentation

- `ARCHITECTURAL-FREEZE-1.0.md` - Architectural freeze decisions
- `AGENTS.md` - Agent definitions and runtime
- `ARCHITECTURE.md` - System architecture
- `GOVERNANCE.md` - Governance policies
- `CHANGELOG.md` - Change history
- `NOTEAGENTS-SYSTEM-SPECIFICATION.md` - Full system specification
- `IMPLEMENTATION_PLAN.md` - Implementation plan