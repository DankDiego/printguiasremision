import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { saveGuia } from '../services/GuiaService'
import { getPlacas } from '../services/PlacaService'
import { getMateriales } from '../services/MaterialService'
import { jsPDF } from 'jspdf'
const CrearGuiaTonForm = () => {
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
    let isdesmontado = false

    async function loadPlacas () {
      const response = await getPlacas()
      if (response.status === 200) {
        if (!isdesmontado) {
          setPlacas(response.data)
        }
      }
    }
    loadPlacas()
      .catch((err) => { console.log(err) })

    return () => {
      isdesmontado = true
    }
  }, [])
  useEffect(() => {
    let desmontado = false

    async function loadMateriales () {
      const response = await getMateriales()
      if (response.status === 200) {
        if (!desmontado) {
          setMateriales(response.data)
        }
      }
    }
    loadMateriales()
      .catch((err) => { console.log(err) })

    return () => {
      desmontado = true
    }
  }, [])
  const onSubmit = (data, e) => {
    saveGuia(data)
    document.getElementById('guias-form').reset()
    pdfGenerator(data)
  }
  const pdfGenerator = (textos) => {
    const fecha = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dataParsed = textos
    console.log(dataParsed)
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: [16.5, 21.5]
    })
    doc.setFontSize(7)
    doc.text(dataParsed.partida, 1, 3.4)
    doc.text(dataParsed.llegada, 8, 3.4)
    doc.text(dataParsed.nroplaca, 1, 5.2)
    doc.text(dataParsed.conductor, 2.2, 5.2)
    doc.text(dataParsed.nrolicencia, 1, 5.5)
    doc.text(dataParsed.destirazonsocial, 9, 4.1)
    doc.text(dataParsed.destiruc, 7.8, 4.45)
    doc.text(dataParsed.destidni, 10.6, 4.45)
    doc.text(dataParsed.transrazonsocial, 9, 5.1)
    doc.text(dataParsed.transruc, 10.6, 5.46)
    doc.text(dataParsed.materialenviado, 3.3, 6.7)
    doc.text(dataParsed.materialenviadocant, 12, 6.7)
    doc.text(dataParsed.materialenviadound, 9.7, 6.7)
    doc.text(fecha.toLocaleDateString('es-ES', options), 1, 4.4)
    doc.text('HORA:', 9, 9)
    doc.text(fecha.toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true }), 10, 9)
    doc.text(dataParsed.nroguiadest, 0.5, 8.1)
    doc.text('Transp', 0.5, 8.5)
    doc.text(dataParsed.nroguiatra, 1.5, 8.5)

    /* doc.text('F3desc', 3.3, 7.2)
    doc.text('F3cant', 8.9, 7.2)
    doc.text('F3und', 9.7, 7.2)
    doc.text('F4desc', 3.3, 7.7)
    doc.text('F4cant', 8.9, 7.7)
    doc.text('F4und', 9.7, 7.7)
    doc.text('F5desc', 3.3, 8.1)
    doc.text('F5cant', 8.9, 8.1)
    doc.text('F5und', 9.7, 8.1)
    doc.text('F6desc', 3.3, 8.6)
    doc.text('F6cant', 8.9, 8.6)
    doc.text('F6und', 9.7, 8.6) */

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
                  <div className='text-center uppercase text-2xl'>Registrar Guia Toneladas</div>

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
                        <label className='mb-1'>Numero de Guia</label>
                        <input
                          placeholder='0001-012356'
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('nrodeguia', {
                            required: '*Este campo es requerido'
                          })}
                        />
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
                            required: '*Este campo es requerido'
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
                        <label className='mb-1'>Peso Total</label>
                        {errors.materialenviadocant && <p className='text-red-600'>{errors.materialenviadocant.message}</p>}
                        <input
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          {...register('materialenviadocant')}
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
                    <div className='flex items-center justify-between mb-5'>

                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Numero Guia Destinatario</label>
                        {errors.nroguiadest && <p className='text-red-600'>{errors.nroguiadest.message}</p>}
                        <input
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          placeholder='002-920'
                          {...register('nroguiadest')}
                        />
                      </div>
                      <div className='flex flex-col w-3/6 px-2'>
                        <label className='mb-1'>Numero Guia Transportista</label>
                        {errors.nroguiatra && <p className='text-red-600'>{errors.nroguiatra.message}</p>}
                        <input
                          className='py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600'
                          type='text'
                          placeholder='00009-343'
                          {...register('nroguiatra', {
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
export default CrearGuiaTonForm
