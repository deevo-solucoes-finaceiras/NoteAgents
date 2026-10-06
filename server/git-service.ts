import { mkdir } from "node:fs/promises"
import path from "node:path"
import { simpleGit, type SimpleGit } from "simple-git"

const workspaceRoot = path.resolve(process.env.GIT_WORKSPACE_ROOT ?? path.join(process.cwd(), "server", "workspaces"))

function assertRepositoryName(name: string) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(name) || name === "." || name === "..") {
    throw new Error("Nome de repositório inválido")
  }
}

function assertRemoteUrl(remoteUrl: string) {
  const url = new URL(remoteUrl)
  if (!['https:', 'ssh:'].includes(url.protocol)) throw new Error("A URL deve usar HTTPS ou SSH")
  if (!url.hostname) throw new Error("URL remota inválida")
}

export function repositoryPath(userId: string, name: string) {
  assertRepositoryName(name)
  return path.join(workspaceRoot, userId, name)
}

export async function cloneRepository(userId: string, name: string, remoteUrl: string) {
  assertRemoteUrl(remoteUrl)
  const destination = repositoryPath(userId, name)
  await mkdir(path.dirname(destination), { recursive: true })
  const git = simpleGit()
  await git.clone(remoteUrl, destination, ["--origin", "origin"])
  return getRepositoryStatus(userId, name)
}

function gitFor(userId: string, name: string): SimpleGit {
  return simpleGit(repositoryPath(userId, name))
}

export async function getRepositoryStatus(userId: string, name: string) {
  const git = gitFor(userId, name)
  const [status, remotes, branch] = await Promise.all([git.status(), git.getRemotes(true), git.revparse(["--abbrev-ref", "HEAD"])])
  return {
    branch: branch.trim(),
    clean: status.isClean(),
    ahead: status.ahead,
    behind: status.behind,
    files: status.files,
    remotes: remotes.map((remote) => ({ name: remote.name, fetch: remote.refs.fetch, push: remote.refs.push })),
  }
}

export async function pullRepository(userId: string, name: string) {
  const result = await gitFor(userId, name).pull()
  return { summary: result.summary, status: await getRepositoryStatus(userId, name) }
}

export async function commitRepository(userId: string, name: string, message: string) {
  if (!message.trim() || message.length > 200) throw new Error("Mensagem de commit inválida")
  const git = gitFor(userId, name)
  await git.add(".")
  const commit = await git.commit(message.trim())
  return { commit: commit.commit, summary: commit.summary, status: await getRepositoryStatus(userId, name) }
}

export async function pushRepository(userId: string, name: string) {
  const result = await gitFor(userId, name).push("origin", "HEAD")
  return { pushed: result.pushed, status: await getRepositoryStatus(userId, name) }
}

export async function removeRepositoryWorkspace(userId: string, name: string) {
  const destination = repositoryPath(userId, name)
  await gitFor(userId, name).checkIgnore(["."]).catch(() => undefined)
  const { rm } = await import("node:fs/promises")
  await rm(destination, { recursive: true, force: true })
}
