import axios from 'axios'
import swal from 'sweetalert2'
const baseUrl = '/api'
export async function getGuias () {
  try {
    const response = await axios({
      url: `${baseUrl}/guias`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function getProducto (id) {
  try {
    console.log(id)
    const response = await axios({
      url: `${baseUrl}/productos/${id}`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function saveGuia (data) {
  try {
    // eslint-disable-next-line no-undef
    const dataguia = {
      nrodeguia: data.nrodeguia,
      partida: data.partida,
      llegada: data.llegada,
      fechainiciotraslado: data.fechainiciotraslado,
      destirazonsocial: data.destirazonsocial,
      destiruc: data.destiruc,
      destidni: data.destidni,
      nroplaca: data.nroplaca,
      conductor: data.conductor,
      nrolicencia: data.nrolicencia,
      transrazonsocial: data.transrazonsocial,
      transruc: data.transruc,
      materialenviado: data.materialenviado,
      materialenviadound: data.materialenviadound,
      materialenviadocant: data.materialenviadocant
    }
    const response = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${baseUrl}/guias`,
      method: 'POST',
      data: dataguia
    })
    if (response.status === 200) {
      swal.fire({
        title: 'Registrado Correctamente',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      })
      /* window.location.reload(false) RESETEAR PAGINA */
    } else {
      console.log('algo fue mal')
    }
  } catch (e) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal!'
    })
    console.log(e)
  }
}
export async function EntreFechasReporte (data) {
  try {
    // eslint-disable-next-line no-undef

    const desdehasta = JSON.stringify({
      fechadesde: data.fechadesde,
      fechahasta: data.fechahasta
    })
    console.log(desdehasta)
    const response = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${baseUrl}/guias/entrefechas`,
      method: 'POST',
      data: desdehasta
    })
    if (response.status === 200) {
      console.log(response.data)
      swal.fire({
        title: 'Consulta correcta',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      })

      return response.data
    } else {
      console.log('Algo fue mal')
    }
  } catch (e) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal!'
    })
    console.log(e)
  }
}
export async function updateProducto (data) {
  try {
    // eslint-disable-next-line no-undef
    /* const formData = new FormData() */
    const objid = data.objidproducto
    const datapost = {
      partida: data.partida,
      llegada: data.llegada,
      fechainiciotraslado: data.fechainiciotraslado,
      destirazonsocial: data.destirazonsocial,
      destiruc: data.destiruc,
      destidni: data.destidni,
      nroplaca: data.nroplaca,
      conductor: data.conductor,
      nrolicencia: data.nrolicencia,
      transrazonsocial: data.transrazonsocial,
      transruc: data.transruc,
      materialenviado: data.materialenviado,
      materialenviadound: data.materialenviadound,
      materialenviadocant: data.materialenviadocant
    }
    console.log(datapost)
    console.log(objid)
    const response = await axios({
      url: `${baseUrl}/guias/${objid}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: datapost
    })
    if (response.status === 200) {
      swal.fire({
        title: 'Editado Correctamente',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      })
    } else {
      console.log('algo fue mal')
    }
  } catch (e) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal!'
    })
    console.log(e)
  }
}
