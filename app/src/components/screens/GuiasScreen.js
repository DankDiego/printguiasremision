import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { getGuias } from '../services/GuiaService'
import MaterialTable from 'material-table'
const baseUrl = '/api/guias'
const GuiasScreen = () => {
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
      title: `Quieres borrar ${dataproducto.llegada}?`,
      text: 'Luego de borrar la guia no podras deshacer este cambio',
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
          'La guia ha sido borrado.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    let isCancelled = false
    // Peticion axios get

    async function loadGuias () {
      const response = await getGuias()
      if (response.status === 200) {
        if (!isCancelled) {
          setDataobj(response.data)
        }
      }
    }
    loadGuias()
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
            { title: 'Destino', field: 'llegada' },
            { title: 'Razon Social', field: 'destirazonsocial' },
            { title: 'Fecha Salida', field: 'fechayhora' },
            { title: 'Placa Transporte', field: 'nroplaca' },
            { title: 'Material', field: 'materialenviado' }
          ]}
          data={dataobj}
          title='Lista de Guias'
          actions={[
            {
              icon: 'delete',
              tooltip: 'Eliminar Producto',
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
export default GuiasScreen
