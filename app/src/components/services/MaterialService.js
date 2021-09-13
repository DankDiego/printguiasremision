import axios from 'axios'
import swal from 'sweetalert2'
const baseUrl = '/api'
export async function getMateriales () {
  try {
    const response = await axios({
      url: `${baseUrl}/materiales`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function getMaterial (id) {
  try {
    console.log(id)
    const response = await axios({
      url: `${baseUrl}/materiales/${id}`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function saveMaterial (data) {
  try {
    // eslint-disable-next-line no-undef

    const dataplaca = JSON.stringify({
      matnombre: data.matnombre
    })
    console.log(dataplaca)
    const response = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${baseUrl}/materiales`,
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
export async function updateMaterial (data) {
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
      url: `${baseUrl}/materiales/${objid}`,
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
