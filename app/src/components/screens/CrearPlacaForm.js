import React from 'react'
import { useForm } from 'react-hook-form'
import { savePlaca } from '../services/PlacaService'
const CrearPlacaForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data, e) => {
    savePlaca(data)
    e.target.reset()
  }
  return (
    <main>

      <div className='main__container'>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center'>
            <div className='w-full md:w-flex sm:w-flex rounded-xl '>
              <div className='flex flex-col'>
                <div id='header' className='flex flex-col items-center justify-center text-black py-4'>
                  <div className='text-center uppercase text-2xl'>Registrar Placa y Conductor</div>

                </div>

                <div id='converters-area' className='px-4 py-5'>
                  <div className='flex flex-col text-black'>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Numero Placa:</label>
                        {errors.placanro && <p className='text-red-600'>{errors.placanro.message}</p>}
                        <input
                          placeholder='Placa del transporte'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('placanro', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Capacidad:</label>
                        {errors.capacidad && <p className='text-red-600'>{errors.capacidad.message}</p>}

                        <input
                          placeholder='Capacidad del transporte'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('capacidad')}
                        />
                      </div>

                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Unidad de medida:</label>
                        {errors.undmedida && <p className='text-red-600'>{errors.undmedida.message}</p>}
                        <select
                          {...register('undmedida', {
                            required: '*Este campo es requerido'
                          })}
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                        >

                          <option value='m3'>Metro Cubico</option>
                          <option value='t'>Toneladas</option>
                        </select>

                      </div>

                    </div>

                    <div className='flex items-center mb-5'>

                      <div className='flex flex-col  w-3/6 px-2'>

                        <label className='mb-1'>Conductor:</label>
                        {errors.conductor && <p className='text-red-600'>{errors.conductor.message}</p>}
                        <input
                          placeholder='Nombre del conductor asignado'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('conductor', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>

                    </div>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Numero de Licencia:</label>
                        {errors.conductorlic && <p className='text-red-600'>{errors.conductorlic.message}</p>}

                        <input
                          placeholder='Numero de Licencia del conductor'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('conductorlic', {
                            required: '*Este campo es requerido'
                          })}
                        />
                      </div>

                    </div>

                    <div className='flex items-center justify-between mb-5 text-right'>
                      <div className='flex flex-col text-right w-3/6 px-2'>
                        <input readOnly hidden type='text' id='idprod' className='rounded focus:outline-none text-gray-600 focus:text-gray-600' />

                      </div>
                      <button className='border-2 border-transparent bg-green-500 ml-3 py-2 px-4 font-bold uppercase text-black rounded transition-all hover:border-green-500 hover:bg-transparent hover:text-green-500'>Guardar</button>

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
export default CrearPlacaForm
