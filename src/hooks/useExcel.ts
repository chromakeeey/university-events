import * as XLSX from 'xlsx'

const useExcel = () => {
  const exportCSV = (data: unknown[], name: string, headings: string[]) => {
    const wb = XLSX.utils.book_new()
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(ws, [headings])
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
    XLSX.utils.book_append_sheet(wb, ws, name)

    XLSX.writeFile(wb, `${name}.xlsx`)
  }

  return { exportCSV }
}

export default useExcel
