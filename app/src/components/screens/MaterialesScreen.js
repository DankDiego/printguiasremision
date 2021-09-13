import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { getMateriales } from '../services/MaterialService'
import MaterialTable from 'material-table'

const baseUrl = '/api/materiales'
const MaterialesScreen = () => {
  const [dataobj, setDataobj] = useState([])

  // Peticion axios delete
  const peticionDelete = async (id) => {
    console.log(id)
    await axios.delete(baseUrl + '/' + id)
      .then(response => {
      }).catch(error => {
        console.log(error)
      })
  }

  const alertaEliminar = (dataMaterial) => {
    swal.fire({
      title: `Quieres borrar ${dataMaterial.matnombre}?`,
      text: 'Luego de borrar el material no hay vuelta atras',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        peticionDelete(dataMaterial.id)
        setDataobj(dataobj.filter(Material => Material.id !== dataMaterial.id))
        swal.fire(
          'Borrado!',
          'El Placa ha sido borrado.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    // Peticion axios get
    async function loadMateriales () {
      const response = await getMateriales()
      if (response.status === 200) {
        setDataobj(response.data)
      }
    }
    loadMateriales()
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <main>
      <div className='main__container'>
        <MaterialTable
          columns={[
            { title: 'Material', field: 'matnombre' }
          ]}
          data={dataobj}
          title='Lista de Materiales'
          actions={[
            {
              icon: 'delete',
              tooltip: 'Eliminar Material',
              onClick: (event, rowData) => alertaEliminar(rowData)
            }

          ]}
          options={{
            actionsColumnIndex: 0
          }}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'Filas'
            },
            toolbar: {
              searchTooltip: 'El buscador arrojara cualquier coincidencia',
              searchPlaceholder: 'Buscar'
            }

          }}
        />

      </div>
    </main>
  )
}
export default MaterialesScreen
