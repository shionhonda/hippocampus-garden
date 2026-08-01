type MarkdownNode = {
  type: string
  lang?: string | null
  value?: string
  children?: MarkdownNode[]
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function transformMermaidBlocks(node: MarkdownNode) {
  if (node.type === "code" && node.lang === "mermaid" && node.value) {
    node.type = "html"
    node.value = `<pre class="mermaid" data-mermaid-source>${escapeHtml(node.value)}</pre>`
    delete node.lang
    delete node.children
    return
  }

  node.children?.forEach(transformMermaidBlocks)
}

export function remarkMermaid() {
  return (tree: MarkdownNode) => transformMermaidBlocks(tree)
}
