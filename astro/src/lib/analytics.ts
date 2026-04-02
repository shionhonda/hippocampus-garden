import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { getAllPosts, getPostPath, type Post } from "./posts"

type AnalyticsNode = { path: string; count: number }
type AnalyticsResult = { node: AnalyticsNode; post: Post }

const PROPERTY_ID = "376031501"
const TOTAL_START_DATE = "2023-09-10"
const RECENT_START_DATE = "30daysAgo"

let cache:
  | Promise<{
      recent: AnalyticsResult[]
      total: AnalyticsResult[]
    }>
  | undefined

function getJsonPath() {
  return fileURLToPath(
    new URL("../../../content/assets/google-analytics-v3.json", import.meta.url),
  )
}

function readLegacyTotals() {
  const jsonPath = getJsonPath()
  if (!fs.existsSync(jsonPath)) return [] as AnalyticsNode[]
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as {
    nodes: AnalyticsNode[]
  }
  return data.nodes
}

async function fetchGaRows(startDate: string) {
  if (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) return null

  const { google } = await import("googleapis")
  const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    undefined,
    process.env.PRIVATE_KEY.replaceAll("\\n", "\n"),
    "https://www.googleapis.com/auth/analytics.readonly",
  )

  await jwtClient.authorize()

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth: jwtClient,
  })

  const result = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageviews" }],
      orderBys: [{ metric: { metricName: "screenPageviews" }, desc: true }],
    },
  })

  return (
    result.data.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      count: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? []
  )
}

function mergeTotalsWithLegacy(rows: AnalyticsNode[], legacyTotals: AnalyticsNode[]) {
  const mergedCounts = new Map<string, number>()

  for (const row of rows) {
    mergedCounts.set(row.path, (mergedCounts.get(row.path) ?? 0) + row.count)
  }

  for (const legacyNode of legacyTotals) {
    mergedCounts.set(
      legacyNode.path,
      (mergedCounts.get(legacyNode.path) ?? 0) + legacyNode.count,
    )
  }

  return [...mergedCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((left, right) => right.count - left.count)
}

function attachPosts(nodes: AnalyticsNode[], posts: Post[]) {
  const postsByPath = new Map(posts.map((post) => [getPostPath(post), post]))
  return nodes
    .map((node) => ({ node, post: postsByPath.get(node.path) }))
    .filter((entry): entry is AnalyticsResult => Boolean(entry.post))
}

async function loadAnalytics() {
  const posts = await getAllPosts()
  const legacyTotals = readLegacyTotals()

  try {
    const [recentRows, totalRows] = await Promise.all([
      fetchGaRows(RECENT_START_DATE),
      fetchGaRows(TOTAL_START_DATE),
    ])

    const recent = attachPosts(recentRows ?? legacyTotals, posts)
    const total = attachPosts(
      totalRows ? mergeTotalsWithLegacy(totalRows, legacyTotals) : legacyTotals,
      posts,
    )

    return { recent, total }
  } catch {
    return {
      recent: attachPosts(legacyTotals, posts),
      total: attachPosts(legacyTotals, posts),
    }
  }
}

async function getAnalyticsCache() {
  cache ??= loadAnalytics()
  return cache
}

export async function getTrendingPosts(limit = 5) {
  const data = await getAnalyticsCache()
  return data.recent.slice(0, limit)
}

export async function getMostReadPosts(limit = 5) {
  const data = await getAnalyticsCache()
  return data.total.slice(0, limit)
}
