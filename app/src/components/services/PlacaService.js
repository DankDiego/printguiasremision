import axios from 'axios'
import swal from 'sweetalert2'
const baseUrl = '/api'
export async function getPlacas () {
  try {
    const response = await axios({
      url: `${baseUrl}/placas`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function getPlacasTn () {
  try {
    const response = await axios({
      url: `${baseUrl}/placas/tn`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPlacasMc () {
  try {
    const response = await axios({
      url: `${baseUrl}/placas/mc`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPlaca (id) {
  try {
    console.log(id)
    const response = await axios({
      url: `${baseUrl}/placas/${id}`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function savePlaca (data) {
  try {
    // eslint-disable-next-line no-undef

    const dataplaca = JSON.stringify({
      placanro: data.placanro,
      capacidad: data.capacidad,
      undmedida: data.undmedida,
      conductor: data.conductor,
      conductorlic: data.conductorlic
    })
    console.log(dataplaca)
    const response = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${baseUrl}/placas`,
      method: 'POST',
      data: dataplaca
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
export async function updatePlaca (data) {
  try {
    // eslint-disable-next-line no-undef
    /* const formData = new FormData() */
    const objid = data.objidplaca
    const datapost = {
      placanro: data.placanro,
      capacidad: data.capacidad,
      undmedida: data.undmedida,
      conductor: data.conductor,
      conductorlic: data.conductorlic
    }
    console.log(datapost)
    console.log(objid)
    const response = await axios({
      url: `${baseUrl}/placas/${objid}`,
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
