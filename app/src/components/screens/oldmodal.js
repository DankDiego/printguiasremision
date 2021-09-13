import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { updateProducto } from '../services/ProductoService'

const columns = [
  { title: 'Producto', field: 'nombreproducto' },
  { title: 'Precios', field: 'precioprod', type: 'numeric' },
  { title: 'Cantidad', field: 'cantidadprod' },
  { title: 'Descripcion', field: 'descripcionprod' }
]
const baseUrl = '/api/productos'
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 800,
    backgroundColor: 'black',
    border: '3px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}))
const ProductosScreen = () => {
  const styles = useStyles()
  const [productoselect, setProductoselect] = useState({
    cantidadprod: 0,
    capacidadprod: '',
    codigoprod: '',
    colorprod: '',
    descripcionprod: '',
    estadoprod: '',
    fabricante: '',
    fecharegistroprod: '',
    id: '',
    nombreproducto: '',
    precioprod: 0,
    productoImage: ''
  })
  const [data, setData] = useState([])
  const [modalEditar, setmodalEditar] = useState(false)
  const { handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (inputdata, e) => {
    updateProducto(inputdata)
    e.target.reset()
  }
  // Peticion axios get
  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  // Peticion axios delete
  const peticionDelete = async (id) => {
    console.log(id)
    await axios.delete(baseUrl + '/' + id)
      .then(response => {
        // lo movi al otro lado
        /* setData(data.filter(producto => producto.id !== productoselect.id)) */
      }).catch(error => {
        console.log(error)
      })
  }
  /* const handleChange = e => {
    const { name, value } = e.target
    setProductoselect(prevState => ({
      ...prevState,
      [name]: value
    }))
  } */
  const seleccionarProducto = (producto, caso) => {
    switch (caso) {
      case 'Editar':
        setProductoselect(producto)
        abrirCerrarModalEditar(producto)
        break
      case 'Eliminar':
        console.log(producto.id)
        alertaEliminar(producto)
        break
      default:
        break
    }
  }
  const abrirCerrarModalEditar = () => {
    setmodalEditar(!modalEditar)
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
        setData(data.filter(producto => producto.id !== dataproducto.id))
        swal.fire(
          'Borrado!',
          'El producto ha sido borrado.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    peticionGet()
  }, [])

  return (
    <main>
      <div className='main__container'>
        <MaterialTable
          columns={columns}
          data={data}
          title='Lista de productos'
          actions={[
            {
              icon: 'delete',
              tooltip: 'Eliminar Producto',
              onClick: (event, rowData) => seleccionarProducto(rowData, 'Eliminar')
            },
            {
              icon: 'edit',
              tooltip: 'Editar Producto',
              onClick: (event, rowData) => seleccionarProducto(rowData, 'Editar')
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
        <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}
        >
          <div className={`${styles.modal}`}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center'>
              <div className='w-full md:w-flex sm:w-flex rounded-xl bg-black'>
                <div className='flex flex-col'>
                  <div id='header' className='flex flex-col items-center justify-center text-white py-4 bg-black'>
                    <div className='text-center uppercase text-2xl'>Editar Producto</div>

                  </div>

                  <div id='converters-area' className='px-4 py-5'>
                    <div className='flex flex-col text-white'>

                      <div className='flex items-center justify-between mb-5'>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Producto</label>
                          {errors.nombreproducto && <p className='text-red-600'>{errors.nombreproducto.message}</p>}
                          <input
                            type='text'
                            defaultValue={productoselect.nombreproducto}
                            {...('nombreproducto', {
                              required: '*Este campo es requerido',
                              minLength: {
                                value: 3,
                                message: 'Minimo 3 caracteres'
                              },
                              maxLength: {
                                value: 20,
                                message: 'Maximo de 20 caracteres'
                              }
                            })}
                            className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          />
                        </div>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Fabricante</label>
                          <input type='text' defaultValue={productoselect.fabricante} id='Fabricante' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                      </div>

                      <div className='flex items-center justify-between mb-5'>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Precio</label>
                          <input type='number' defaultValue={productoselect.precioprod} id='Precio' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Cantidad</label>
                          <input type='number' defaultValue={productoselect.cantidadprod} id='Cantidad' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                      </div>

                      <div className='flex items-center justify-between mb-5'>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Codigo</label>
                          <input type='text' defaultValue={productoselect.codigoprod} id='Codigo' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Estado</label>
                          <input type='text' defaultValue={productoselect.estadoprod} id='Estado' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                      </div>

                      <div className='flex items-center justify-between mb-5'>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Capacidad</label>
                          <input type='text' defaultValue={productoselect.capacidadprod} id='Capacidad' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                        <div className='flex flex-col text-center w-3/6 px-2'>
                          <label className='mb-1'>Color</label>
                          <input type='text' defaultValue={productoselect.colorprod} id='Color' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                      </div>

                      <div className='flex items-center justify-between mb-5'>

                        <div className='flex flex-col text-center w-full px-2'>
                          <label className='mb-1'>Descripcion</label>
                          <textarea type='text' defaultValue={productoselect.descripcionprod} id='descripcion' className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600' />
                        </div>
                      </div>
                      <div className='flex items-center justify-between mb-5 text-right'>
                        <div className='flex flex-col text-right w-3/6 px-2'>
                          <input readOnly hidden type='text' value={productoselect.id} id='idprod' className='rounded focus:outline-none text-gray-600 focus:text-gray-600' />

                        </div>
                        <button className='border-2 border-transparent bg-green-500 ml-3 py-2 px-4 font-bold uppercase text-white rounded transition-all hover:border-green-500 hover:bg-transparent hover:text-green-500'>Guardar Cambios</button>
                        <button onClick={() => abrirCerrarModalEditar()} className='border-2 border-transparent bg-red-500 ml-3 py-2 px-4 font-bold uppercase text-white rounded transition-all hover:border-red-500 hover:bg-transparent hover:text-red-500'>Cancelar</button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </form>

          </div>
        </Modal>
      </div>
    </main>
  )
}
export default ProductosScreen
