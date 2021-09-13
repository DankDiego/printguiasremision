import React from 'react'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export const ExportCSV = ({ csvData, fileName }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

  const fileExtension = '.xlsx'

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData)

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

    // eslint-disable-next-line no-undef
    const data = new Blob([excelBuffer], { type: fileType })

    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (

    <button className='border-2 border-transparent bg-green-500 ml-3 py-2 px-4 font-bold uppercase text-black rounded transition-all hover:border-green-500 hover:bg-transparent hover:text-green-500' onClick={(e) => exportToCSV(csvData, fileName)}>Generar Excel</button>

  )
}
