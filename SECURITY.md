# SECURITY

## Security Policies and Best Practices

### Reporting Vulnerabilities

Please report security vulnerabilities via GitHub Security Advisories or by emailing security@noteagents.com.

### Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |

### Reporting a Vulnerability

1. Do not disclose the vulnerability publicly until it is resolved
2. Use the GitHub Security Advisory feature or email security@noteagents.com
3. Include:
   - Type of vulnerability
   - Affected components
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Security Practices

- Never commit API keys, passwords, or private keys to the repository
- Use environment variables for sensitive configuration (.env.example, not .env)
- Run `pnpm audit` regularly to detect vulnerable dependencies
- All secrets must be stored in GitHub Secrets or external secret managers
- Input validation must be performed on all user-facing inputs
- Authentication and authorization must be verified server-side
- Dependencies should be kept up to date with regular `pnpm update`

### Security Scanning

- `pnpm audit` - Detects known vulnerabilities in dependencies
- Secret scanning - Prevents accidental commitment of secrets
- Dependency review - Ensures no malicious packages are introduced

### Dependencies

The project uses the following package managers and their security advisories:
- pnpm audit for vulnerability detection
- Regular dependency updates recommended

---

# CONTRIBUTING

## Contributing to NoteAgents

Thank you for considering contributing to NoteAgents! This document governs how you can contribute to the project.

### 📜 Code of Conduct

Participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

### � Ways to Contribute

- **Bug reports** - Use the issue tracker with clear reproduction steps
- **Feature requests** - Describe the problem and proposed solution
- **Documentation improvements** - Fix typos, clarify explanations, add examples
- **Pull requests** - Follow the PR template and review guidelines
- **Testing** - Add tests for new features and bug fixes
- **Code review** - Help review PRs and provide feedback

### � Development Workflow

1. **Fork the repository**
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following the project's coding standards
4. **Run the test suite**:
   ```bash
   pnpm test
   ```
5. **Run typecheck**:
   ```bash
   pnpm typecheck
   ```
6. **Run lint**:
   ```bash
   pnpm lint
   ```
7. **Commit your changes** using conventional commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
8. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
9. **Open a Pull Request** against the `main` branch of the upstream repository

### � Conventional Commits

All commits must follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style formatting
- `refactor` - Code refactoring
- `test` - Adding missing tests
- `chore` - Routine changes
- `build` - Build system changes
- `ci` - CI/CD configuration changes
- `perf` - Performance improvements
- `test` - Adding missing tests

### � Pull Request Guidelines

- Fill out the PR template completely
- Link to any related issues
- Ensure all tests pass
- Ensure typecheck passes
- Ensure lint passes
- Respond to reviewer comments promptly
- Keep PRs focused and small (one feature/fix per PR)

### � Reporting Issues

- Use the issue tracker for bugs and features
- Include clear reproduction steps for bugs
- Describe the expected vs. actual behavior
- Check existing issues before creating new ones
- Use labels and milestones appropriately

### � Development Setup

```bash
# Clone the repository
git clone https://github.com/deevo-solucoes-finaceiras/NoteAgents.git
cd NoteAgents

# Install dependencies
pnpm install

# Run development server
pnpm dev:server

# Run typecheck
pnpm typecheck

# Run tests
pnpm test

# Run lint
pnpm lint
```

### � License

By contributing to NoteAgents, you agree that your contributions will be licensed under the project's license.

See the `LICENSE` file for more information.