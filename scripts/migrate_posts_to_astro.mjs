import fs from "node:fs"
import path from "node:path"

const repoRoot = process.cwd()
const sourceRoot = path.join(repoRoot, "content", "blog")
const targetRoot = path.join(repoRoot, "astro", "src", "content", "posts")

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function removeDirContents(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    fs.rmSync(fullPath, { recursive: true, force: true })
  }
}

function copyDir(source, target) {
  ensureDir(target)
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name)
    const targetPath = path.join(target, entry.name)
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}

function inferLang(frontmatter) {
  const tagsMatch = frontmatter.match(/^tags:\s*\[(.+)\]\s*$/m)
  if (!tagsMatch) return "en"
  const tags = [...tagsMatch[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (tags.includes("ja")) return "ja"
  if (tags.includes("en")) return "en"
  return "en"
}

function updateFrontmatter(filePath, slug) {
  const content = fs.readFileSync(filePath, "utf8")
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) {
    throw new Error(`Missing frontmatter: ${filePath}`)
  }

  let frontmatter = match[1]
  if (!/^slug:\s*/m.test(frontmatter)) {
    frontmatter += `\nslug: "${slug}"`
  }

  if (!/^lang:\s*/m.test(frontmatter)) {
    frontmatter += `\nlang: "${inferLang(frontmatter)}"`
  }

  const next = `---\n${frontmatter}\n---\n${content.slice(match[0].length)}`
  fs.writeFileSync(filePath, next)
}

function main() {
  ensureDir(targetRoot)
  removeDirContents(targetRoot)

  const postDirs = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  for (const slug of postDirs) {
    const sourceDir = path.join(sourceRoot, slug)
    const targetDir = path.join(targetRoot, slug)
    copyDir(sourceDir, targetDir)
    updateFrontmatter(path.join(targetDir, "index.md"), slug)
  }

  console.log(`Migrated ${postDirs.length} posts to astro/src/content/posts`)
}

main()
