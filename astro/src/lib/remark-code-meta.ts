type Node = {
  type?: string
  lang?: string | null
  meta?: string | null
  children?: Node[]
}

function visit(node: Node, callback: (node: Node) => void) {
  callback(node)
  for (const child of node.children ?? []) {
    visit(child, callback)
  }
}

export function remarkCodeMeta() {
  return (tree: Node) => {
    visit(tree, (node) => {
      if (node.type !== "code" || !node.lang) return

      const separatorIndex = node.lang.indexOf(":")
      if (separatorIndex === -1) return

      const language = node.lang.slice(0, separatorIndex)
      const trailingMeta = node.lang.slice(separatorIndex + 1)
      if (!trailingMeta.includes("=")) return

      node.lang = language
      node.meta = node.meta ? `${trailingMeta} ${node.meta}` : trailingMeta
    })
  }
}
