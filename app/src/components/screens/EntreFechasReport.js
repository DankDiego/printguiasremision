import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { EntreFechasReporte } from '../services/GuiaService'
import { ExportCSV } from '../services/GenerarExcelService'
import { getRsociales } from '../services/RsocialService'

const EntreFechaReport = () => {
  const reportename = 'NuevoReporte'
  const [rsocialest, setRsocialest] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [csvdata, setCsvdata] = useState([])

  const onSubmit = (data, e) => {
    EntreFechasReporte(data).then(function (response) {
      console.log(response)
      setCsvdata(response)
    })
    e.target.reset()
  }
  useEffect(() => {
    let desmontadoot = false
    async function loadRsocialest () {
      const response = await getRsociales()
      if (response.status === 200) {
        if (!desmontadoot) {
          setRsocialest(response.data)
        }
      }
    }
    loadRsocialest()
      .catch((err) => { console.log(err) })
    return () => {
      desmontadoot = true
    }
  }, [])

  return (
    <main>

      <div className='main__container'>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center'>
            <div className='w-full md:w-flex sm:w-flex rounded-xl '>
              <div className='flex flex-col'>
                <div id='header' className='flex flex-col items-center justify-center text-black py-4'>
                  <div className='text-center uppercase text-2xl'>Reporte Entre Fechas</div>
                </div>

                <div id='converters-area' className='px-4 py-5'>
                  <div className='flex flex-col text-black'>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Desde:</label>
                        {errors.matnombre && <p className='text-red-600'>{errors.matnombre.message}</p>}
                        <input
                          placeholder='Placa del transporte'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='date'
                          {...register('fechadesde', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Hasta:</label>
                        {errors.matnombre && <p className='text-red-600'>{errors.matnombre.message}</p>}
                        <input
                          placeholder='Placa del transporte'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='date'
                          {...register('fechahasta', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Razon Social</label>
                        {errors.materialenviado && <p className='text-red-600'>{errors.materialenviado.message}</p>}
                        <select
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='select'
                          {...register('nomrzsocial', {
                            required: '*Este campo es requerido'
                          })}
                        >
                          <option value='sin seleccion'>
                            Seleccione Razon Social
                          </option>
                          {rsocialest.map((val, key) => {
                            return (
                              <option key={key} value={val.rzsocial}>
                                {val.rzsocial}
                              </option>
                            )
                          })}
                        </select>

                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>

                        <button className='border-2 border-transparent bg-green-500 ml-3 py-2 px-4 font-bold uppercase text-black rounded transition-all hover:border-green-500 hover:bg-transparent hover:text-green-500'>Guardar</button>
                      </div>

                    </div>
                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <ExportCSV csvData={csvdata} fileName={reportename} />
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
export default EntreFechaReport
