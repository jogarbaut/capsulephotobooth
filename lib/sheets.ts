type PackageRow = {
  tierKey: string
  title: string
  price: number
  tagline: string
  hours?: string
  prints?: string
  attendants?: string
  featured?: boolean
}

type ItemRow = {
  tierKey: string
  item: string
  type?: "included" | "upgrade" | string
  sortOrder?: number
}

function parseCsv(csv: string): string[][] {
  // Simple CSV parser (handles commas in quotes)
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let inQuotes = false

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]
    const next = csv[i + 1]

    if (char === '"' && next === '"') {
      cell += '"'
      i++
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim())
      cell = ""
      continue
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (cell.length || row.length) {
        row.push(cell.trim())
        rows.push(row)
      }
      row = []
      cell = ""
      continue
    }

    cell += char
  }

  if (cell.length || row.length) {
    row.push(cell.trim())
    rows.push(row)
  }

  // remove empty rows
  return rows.filter((r) => r.some((v) => v !== ""))
}

function csvToObjects<T extends Record<string, any>>(csv: string): T[] {
  const rows = parseCsv(csv)
  const headers = rows[0].map((h) => h.trim())
  const data = rows.slice(1)

  return data.map((r) => {
    const obj: Record<string, any> = {}
    headers.forEach((h, idx) => {
      obj[h] = r[idx] ?? ""
    })
    return obj as T
  })
}

export async function getWeddingPackages(): Promise<PackageRow[]> {
  const url = process.env.SHEETS_PACKAGES_CSV_URL
  if (!url) throw new Error("Missing SHEETS_PACKAGES_CSV_URL")

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error("Failed to fetch packages CSV")

  const csv = await res.text()
  const rows = csvToObjects<any>(csv)

  return rows.map((r) => ({
    tierKey: String(r.tierKey || "").trim(),
    title: String(r.title || "").trim(),
    price: Number(r.price || 0),
    tagline: String(r.tagline || "").trim(),
    hours: String(r.hours || "").trim(),
    prints: String(r.prints || "").trim(),
    attendants: String(r.attendants || "").trim(),
    featured: String(r.featured || "").toLowerCase() === "true",
  }))
}

export async function getWeddingPackageItems(): Promise<ItemRow[]> {
  const url = process.env.SHEETS_ITEMS_CSV_URL
  if (!url) throw new Error("Missing SHEETS_ITEMS_CSV_URL")

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error("Failed to fetch items CSV")

  const csv = await res.text()
  const rows = csvToObjects<any>(csv)

  return rows
    .map((r) => ({
      tierKey: String(r.tierKey || "").trim(),
      item: String(r.item || "").trim(),
      type: String(r.type || "").trim(),
      sortOrder: Number(r.sortOrder || 999),
    }))
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
}
