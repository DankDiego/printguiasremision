import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { saveGuia } from '../services/GuiaService'
import { getPlacas } from '../services/PlacaService'
import { getMateriales } from '../services/MaterialService'
import { jsPDF } from 'jspdf'
const CrearGuiaForm = () => {
  const [idplaca, setIdplaca] = useState(-1)
  const handleCargarPlaca = (selected) => {
    const opcionplaca = selected.target.value
    setIdplaca(opcionplaca)
    settingvaluesform(opcionplaca)
  }
  const settingvaluesform = (placarel) => {
    if (placarel > -1) {
      setValue('nroplaca', placas[placarel].placanro)
      setValue('conductor', placas[placarel].conductor)
      setValue('nrolicencia', placas[placarel].conductorlic)
      setValue('materialenviadocant', placas[placarel].capacidad)
      setValue('materialenviadound', placas[placarel].undmedida)
    } else {
      console.log('Seleccione Placa')
    }
  }
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()
  const [placas, setPlacas] = useState([])
  const [materiales, setMateriales] = useState([])
  useEffect(() => {
    async function loadPlacas () {
      const response = await getPlacas()
      if (response.status === 200) {
        setPlacas(response.data)
      }
    }
    loadPlacas()
      .catch((err) => { console.log(err) })
  }, [])
  useEffect(() => {
    async function loadMateriales () {
      const response = await getMateriales()
      if (response.status === 200) {
        setMateriales(response.data)
      }
    }
    loadMateriales()
      .catch((err) => { console.log(err) })
  }, [])
  const onSubmit = (data, e) => {
    saveGuia(data)
    document.getElementById('guias-form').reset()
    pdfGenerator(data)
  }
  const pdfGenerator = (textos) => {
    const dataParsed = textos
    console.log(dataParsed)
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [16.5, 21.5]
    })
    doc.text(dataParsed.nroplaca, 10, 10)
    doc.save(`${dataParsed.llegada}.pdf`)
  }
  return (
    <main>

      <div className='main__container'>

        <form id='guias-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center'>
            <div className='w-full md:w-flex sm:w-flex rounded-xl '>
              <div className='flex flex-col'>
                <div id='header' className='flex flex-col items-center justify-center text-black py-4'>
                  <div className='text-center uppercase text-2xl'>Registrar Guia</div>

                </div>

                <div id='converters-area' className='px-4 py-5'>
                  <div className='flex flex-col text-black'>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-2/6 px-2'>
                        <label className='mb-1'>Punto de partida</label>
                        {errors.partida && <p className='text-red-600'>{errors.partida.message}</p>}
                        <input
                          defaultValue='Cantera Cristopher Carabayllo'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('partida', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>
                      <div className='flex flex-col w-2/6 px-2'>
                        <label className='mb-1'>Punto de Llegada</label>
                        {errors.llegada && <p className='text-red-600'>{errors.llegada.message}</p>}
                        <input
                          placeholder='Destino al cual se envia'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('llegada', {
                            required: '*Este campo es requerido',
                            maxLength: {
                              value: 60,
                              message: 'Maximo de 60 caracteres'
                            }
                          })
                          }
                        />
                      </div>
                      <div className='flex flex-col  w-2/6 px-2'>
                        <label className='mb-1'>Fecha de inicio del Traslado</label>
                      </div>
                    </div>

                    <div className='flex items-center mb-5'>

                      <div className='flex flex-col  w-2/6 px-2'>

                        <label className='mb-1'>DESTINATARIO:</label>
                        {errors.destirazonsocial && <p className='text-red-600'>{errors.destirazonsocial.message}</p>}
                        <input
                          placeholder='Nombre o Denominacion o Razon Social'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('destirazonsocial', {
                            required: '*Este campo es requerido'
                          })}
                        />

                      </div>
                      <div className='flex flex-col  w-2/6 px-2'>
                        <label className='mb-1'>R.U.C..</label>
                        {errors.destiruc && <p className='text-red-600'>{errors.destiruc.message}</p>}
                        <input
                          placeholder='R.U.C Destinatario'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('destiruc', {
                            required: '*Este campo es requerido',
                            pattern: {
                              value: /^[0-9]*$/,
                              message: 'Solo Numeros'
                            }
                          })}
                        />
                      </div>
                      <div className='flex flex-col  w-2/6 px-2'>
                        <label className='mb-1'>DNI</label>
                        {errors.destidni && <p className='text-red-600'>{errors.destidni.message}</p>}
                        <input
                          placeholder='DNI Destinatario'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('destidni', {
                            pattern: {
                              value: /^[0-9]*$/,
                              message: 'Solo Numeros'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>TRANSPORTE Y CONDUCTORES:</label>
                        {errors.nroplaca && <p className='text-red-600'>{errors.nroplaca.message}</p>}
                        <select
                          onChange={handleCargarPlaca}
                          placeholder='Nro de Placa'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='select'
                        >
                          <option value='-1'>
                            Seleccione la Placa
                          </option>
                          {placas.map((val, key) => {
                            return (
                              <option key={key} value={key}>
                                {val.placanro}
                              </option>
                            )
                          })}
                        </select>
                        <input
                          placeholder='Nro de Placa'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('nroplaca')}
                          value={idplaca > -1 ? placas[idplaca].placanro : ''}
                          hidden
                        />
                      </div>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Licencia de Conducir</label>
                        {errors.nrolicencia && <p className='text-red-600'>{errors.nrolicencia.message}</p>}
                        <input
                          placeholder='Nro de Licencia'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          value={idplaca > -1 ? placas[idplaca].conductorlic : ''}
                          {...register('nrolicencia')}

                        />

                      </div>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>Conductor</label>
                        {errors.conductor && <p className='text-red-600'>{errors.conductor.message}</p>}
                        <input
                          placeholder='Nombre del Conductor'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('conductor', {
                            pattern: {
                              value: /^[a-zA-Z,/ ]*$/,
                              message: 'Solo letras, comas, slash y espacios'
                            }
                          })}
                          value={idplaca > -1 ? placas[idplaca].conductor : ''}

                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                      <div className='flex flex-col  w-3/6 px-2'>
                        <label className='mb-1'>DATOS DEL TRANSPORTISTA:</label>
                        {errors.transrazonsocial && <p className='text-red-600'>{errors.transrazonsocial.message}</p>}

                        <input
                          placeholder='Razon Social Transportista'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('transrazonsocial', {
                            required: '*Este campo es requerido'
                          })}
                        />
                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>R.U.C..</label>
                        {errors.transruc && <p className='text-red-600'>{errors.transruc.message}</p>}
                        <input
                          placeholder='R.U.C del transportista'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('transruc', {
                            required: '*Este campo es requerido',
                            pattern: {
                              value: /^[0-9]*$/,
                              message: 'Solo numeros'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>

                      <div className='flex flex-col  w-full px-2'>
                        <label className='mb-1'>Descripcion de Material</label>
                        {errors.materialenviado && <p className='text-red-600'>{errors.materialenviado.message}</p>}
                        <select
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='select'
                          {...register('materialenviado', {
                            required: '*Este campo es requerido',
                            pattern: {
                              value: /^[a-zA-Z0-9,/. ]*$/,
                              message: 'Solo letras, puntos, comas, diagonales y espacios'
                            }
                          })}
                        >
                          <option value='sin seleccion'>
                            Seleccione Material
                          </option>
                          {materiales.map((val, key) => {
                            return (
                              <option key={key} value={val.matnombre}>
                                {val.matnombre}
                              </option>
                            )
                          })}
                        </select>
                        {/* <textarea
                          type='text' id='descripcion'
                          placeholder='Describir material que se envia'
                          {...register('materialenviado', {
                            required: '*Este campo es requerido',
                            pattern: {
                              value: /^[a-zA-Z0-9,/. ]*$/,
                              message: 'Solo letras, puntos, comas, diagonales y espacios'
                            }
                          })}
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                        /> */}
                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Cantidad</label>
                        {errors.materialenviadocant && <p className='text-red-600'>{errors.materialenviadocant.message}</p>}
                        <input
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('materialenviadocant')}
                          value={idplaca > -1 ? placas[idplaca].capacidad : ''}

                        />
                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Unidad de medida</label>
                        {errors.materialenviadound && <p className='text-red-600'>{errors.materialenviadound.message}</p>}
                        <input
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('materialenviadound')}
                          value={idplaca > -1 ? placas[idplaca].undmedida : ''}
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
export default CrearGuiaForm
