export function exportToCsv(rows: Array<Record<string, unknown>>, filename: string): void {
  if (rows.length === 0) return;
  const columns = Object.keys(rows[0] ?? {});
  const escape = (value: unknown) => {
    let cell = value == null ? "" : String(value);
    if (/^[=+\-@\t]/.test(cell)) cell = `'${cell}`;
    return `"${cell.replaceAll('"', '""')}"`;
  };
  const csv = [columns.map(escape).join(","), ...rows.map((row) => columns.map((key) => escape(row[key])).join(","))].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}