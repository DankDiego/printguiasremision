import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { getRsociales } from '../services/RsocialService'
import MaterialTable from 'material-table'

const baseUrl = '/api/rsociales'
const RsocialesScreen = () => {
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

  const alertaEliminar = (dataproducto) => {
    swal.fire({
      title: `Quieres borrar ${dataproducto.rzsocial}?`,
      text: 'Luego de borrarlo no podras deshacer el cambio',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        peticionDelete(dataproducto.id)
        setDataobj(dataobj.filter(producto => producto.id !== dataproducto.id))
        swal.fire(
          'Borrado!',
          'El producto ha sido borrado.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    let isCancelled = false
    // Peticion axios get

    async function loadRsociales () {
      const response = await getRsociales()
      if (response.status === 200) {
        if (!isCancelled) {
          setDataobj(response.data)
        }
      }
    }
    loadRsociales()
      .catch((err) => { console.log(err) })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <main>
      <div className='main__container'>
        <MaterialTable
          columns={[
            { title: 'Razon Social', field: 'rzsocial' },
            { title: 'R.U.C', field: 'rzruc' }
          ]}
          data={dataobj}
          title='Lista de Razon Sociales y R.U.C'
          actions={[
            {
              icon: 'delete',
              tooltip: 'Eliminar Razon Social',
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
export default RsocialesScreen
