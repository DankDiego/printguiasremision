import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'
import { getGuias } from '../services/GuiaService'
import MaterialTable from 'material-table'
/* const columns = [
  { title: 'Producto', field: 'nombreproducto' },
  { title: 'Precios', field: 'precioprod', type: 'numeric' },
  { title: 'Cantidad', field: 'cantidadprod' },
  { title: 'Descripcion', field: 'descripcionprod' }
] */
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
      title: `Quieres borrar ${dataproducto.nombreproducto}?`,
      text: 'Luego de borrar el producto no podras deshacer este cambio',
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
  const separador = (fecha) => {
    const str = fecha
    const myArr = str.split('T')
    return myArr[0]
  }

  return (
    <main>
      <div className='main__container'>
        <MaterialTable
          columns={[
            { title: 'Destino', field: 'llegada' },
            { title: 'Razon Social', field: 'destirazonsocial' },
            { title: 'Fecha Salida', field: 'fechainiciotraslado', render: rowData => separador(rowData.fechainiciotraslado) },
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
            },
            rowData => ({
              icon: () =>
                <Link to={`/dashboard/ListaProducto/edit/${rowData.id}`}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                  </svg>
                </Link>
            })
            /* {
              icon: 'edit',
              tooltip: 'Editar Producto',
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
export default GuiasScreen
