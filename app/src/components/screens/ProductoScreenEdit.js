import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getProducto, updateProducto } from '../services/GuiaService'
import { useParams, Link } from 'react-router-dom'
const ProductosScreenEdit = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    if (id) {
      async function loadProducto () {
        const response = await getProducto(id)
        if (response.status === 200) {
          setValue('nombreproducto', response.data.nombreproducto, { shouldValidate: true })
          setValue('fabricante', response.data.fabricante, { shouldValidate: true })
          setValue('tipo', response.data.tipo, { shouldValidate: true })
          setValue('precioprod', response.data.precioprod, { shouldValidate: true })
          setValue('cantidadprod', response.data.cantidadprod, { shouldValidate: true })
          setValue('codigoprod', response.data.codigoprod, { shouldValidate: true })
          setValue('capacidadprod', response.data.capacidadprod, { shouldValidate: true })
          setValue('colorprod', response.data.colorprod, { shouldValidate: true })
          setValue('estadoprod', response.data.estadoprod, { shouldValidate: true })
          setValue('descripcionprod', response.data.descripcionprod, { shouldValidate: true })
          setValue('objidproducto', response.data.id, { shouldValidate: true })
          console.log(response.data)
        }
      }
      loadProducto()
        .catch((err) => { console.log(err) })
      // get user and set form fields
      /*  userService.getById(id).then(user => {
        const fields = ['title', 'firstName', 'lastName', 'email', 'role']
        fields.forEach(field => setValue(field, user[field]))
        setUser(user)
      }) */
    }
  }, [])
  const onSubmit = (data, e) => {
    updateProducto(data)
  }

  return (
    <main>

      <div className='main__container'>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center'>
            <div className='w-full md:w-flex sm:w-flex rounded-xl '>
              <div className='flex flex-col'>
                <div id='header' className='flex flex-col items-center justify-center text-black py-4'>
                  <div className='text-center uppercase text-2xl'>Registro de Producto</div>

                </div>

                <div id='converters-area' className='px-4 py-5'>
                  <div className='flex flex-col text-black'>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Producto</label>
                        {errors.nombreproducto && <p className='text-red-600'>{errors.nombreproducto.message}</p>}
                        <input
                          name='nombreproducto'
                          placeholder='nombre'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('nombreproducto', {
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
                        />

                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Fabricante</label>
                        {errors.fabricante && <p className='text-red-600'>{errors.fabricante.message}</p>}
                        <input
                          placeholder='fabricante'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('fabricante', {
                            required: '*Este campo es requerido',
                            minLength: {
                              value: 3,
                              message: 'Minimo 3 caracteres'
                            },
                            maxLength: {
                              value: 20,
                              message: 'Maximo de 20 caracteres'
                            }
                          })
                          }
                        />
                      </div>
                    </div>

                    <div className='flex items-center mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Tipo</label>
                        {errors.tipo && <p className='text-red-600'>{errors.tipo.message}</p>}
                        <input
                          placeholder='tipo'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('tipo', {
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
                        />
                      </div>
                      <div className='flex flex-col  w-2/6 px-2'>
                        <label className='mb-1'>Precio</label>
                        {errors.precioprod && <p className='text-red-600'>{errors.precioprod.message}</p>}
                        {errors.precioprod && errors.precioprod.type === 'positiveNumber' && (
                          <p className='text-red-600'>*El precio no puede ser menor a 1</p>
                        )}
                        {errors.precioprod && errors.precioprod.type === 'lessThanHundred' && (
                          <p className='text-red-600'>*El precio no puede ser mayor a 10000</p>
                        )}
                        <input
                          placeholder='precio'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='number'
                          {...register('precioprod', {
                            required: '*Este campo es requerido',
                            validate: {
                              positiveNumber: (value) => parseFloat(value) > 0,
                              lessThanHundred: (value) => parseFloat(value) < 10001
                            }
                          })}
                        />
                      </div>
                      <div className='flex flex-col  w-1/6 px-2'>
                        <label className='mb-1'>Cantidad</label>
                        {errors.cantidadprod && <p className='text-red-600'>{errors.cantidadprod.message}</p>}
                        {errors.cantidadprod && errors.cantidadprod.type === 'mayorstok' && (
                          <p className='text-red-600'>*La cantidad debe ser mayor igual a 0</p>
                        )}
                        {errors.cantidadprod && errors.cantidadprod.type === 'menorstok' && (
                          <p className='text-red-600'>*No puedes tener mas de 9999 productos</p>
                        )}

                        <input
                          placeholder='0~9999'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='number'
                          {...register('cantidadprod', {
                            required: '*Este campo es requerido',
                            validate: {
                              mayorstok: (value) => parseFloat(value) > -1,
                              menorstok: (value) => parseFloat(value) < 9999
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Codigo</label>
                        {errors.codigoprod && <p className='text-red-600'>{errors.codigoprod.message}</p>}
                        <input
                          placeholder='sm0884a5'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('codigoprod', {
                            required: '*Este campo es requerido',
                            minLength: {
                              value: 8,
                              message: 'Minimo 8 caracteres'
                            },
                            maxLength: {
                              value: 12,
                              message: 'Maximo de 12 caracteres'
                            }
                          })}
                        />

                      </div>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Estado</label>
                        {errors.estadoprod && <p className='text-red-600'>{errors.estadoprod.message}</p>}
                        <input
                          placeholder='estado'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('estadoprod', {
                            required: '*Este campo es requerido',
                            minLength: {
                              value: 5,
                              message: 'Minimo 5 caracteres'
                            },
                            maxLength: {
                              value: 20,
                              message: 'Maximo de 20 caracteres'
                            },
                            pattern: {
                              value: /^[a-zA-Z,/ ]*$/,
                              message: 'Solo letras, comas, slash y espacios'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Capacidad</label>
                        {errors.capacidadprod && <p className='text-red-600'>{errors.capacidadprod.message}</p>}

                        <input
                          placeholder='capacidad'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('capacidadprod', {
                            minLength: {
                              value: 3,
                              message: 'Minimo 3 caracteres'
                            },
                            maxLength: {
                              value: 50,
                              message: 'Maximo de 50 caracteres'
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9, ]*$/,
                              message: 'Solo numero, comas, letras y espacios'
                            }
                          })}
                        />
                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Color</label>
                        {errors.colorprod && <p className='text-red-600'>{errors.colorprod.message}</p>}
                        <input
                          placeholder='color'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('colorprod', {
                            minLength: {
                              value: 3,
                              message: 'Minimo 3 caracteres'
                            },
                            maxLength: {
                              value: 40,
                              message: 'Maximo de 40 caracteres'
                            },
                            pattern: {
                              value: /^[a-zA-Z, ]*$/,
                              message: 'Solo letras, comas y espacios'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>

                      <div className='flex flex-col  w-full px-2'>
                        <label className='mb-1'>Descripcion</label>
                        {errors.descripcionprod && <p className='text-red-600'>{errors.descripcionprod.message}</p>}
                        <textarea
                          type='text' id='descripcion'
                          placeholder='Lo ultimo en tecnologia movil'
                          {...register('descripcionprod', {
                            required: '*Este campo es requerido',
                            minLength: {
                              value: 5,
                              message: 'Minimo 6 caracteres'
                            },
                            maxLength: {
                              value: 120,
                              message: 'Maximo de 120 caracteres'
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9,/. ]*$/,
                              message: 'Solo letras, puntos, comas, diagonales y espacios'
                            }
                          })}
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-5 text-right'>
                      <div className='flex flex-col text-right w-3/6 px-2'>
                        <input hidden readOnly type='text' {...register('objidproducto')} className='rounded focus:outline-none text-gray-600 focus:text-gray-600' />

                      </div>
                      <div>
                        <button type='submit' className='border-2 border-transparent bg-green-500 ml-3 py-2 px-4 font-bold uppercase text-black rounded transition-all hover:border-green-500 hover:bg-transparent hover:text-green-500'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                          </svg>
                        </button>
                        <button type='button' className='border-2 border-transparent bg-red-500 ml-3 py-2 px-4 font-bold uppercase text-black rounded transition-all hover:border-red-500 hover:bg-transparent hover:text-red-500'>
                          <Link to='/dashboard/listaproducto'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z' />
                            </svg>
                          </Link>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </main>
  )
}
export default ProductosScreenEdit
