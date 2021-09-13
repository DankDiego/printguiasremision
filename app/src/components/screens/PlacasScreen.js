import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { getPlacas } from '../services/PlacaService'
import MaterialTable from 'material-table'

const baseUrl = '/api/placas'
const PlacasScreen = () => {
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

  const alertaEliminar = (dataPlaca) => {
    swal.fire({
      title: `Quieres borrar ${dataPlaca.placanro}?`,
      text: 'Luego de borrar la Placa no podras deshacer este cambio',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        peticionDelete(dataPlaca.id)
        setDataobj(dataobj.filter(Placa => Placa.id !== dataPlaca.id))
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
    async function loadPlacas () {
      const response = await getPlacas()
      if (response.status === 200) {
        setDataobj(response.data)
      }
    }
    loadPlacas()
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <main>
      <div className='main__container'>
        <MaterialTable
          columns={[
            { title: 'Placa', field: 'placanro' },
            { title: 'Capacidad', field: 'capacidad', type: 'numeric' },
            { title: 'Umd', field: 'undmedida' },
            { title: 'Conductor', field: 'conductor' },
            { title: 'Licencia', field: 'conductorlic' }
          ]}
          data={dataobj}
          title='Lista de Placas'
          actions={[
            {
              icon: 'delete',
              tooltip: 'Eliminar Placa',
              onClick: (event, rowData) => alertaEliminar(rowData)
            }
            /* {
              icon: 'edit',
              tooltip: 'Editar Placa',
              onClick: (event, rowData) => { history.push(`/dashboard/edit/${rowData.id}`) }

            } */
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
export default PlacasScreen
