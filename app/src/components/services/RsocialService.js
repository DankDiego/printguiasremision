import axios from 'axios'
import swal from 'sweetalert2'
const baseUrl = '/api'
export async function getRsociales () {
  try {
    const response = await axios({
      url: `${baseUrl}/rsociales`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function getRsocial (id) {
  try {
    console.log(id)
    const response = await axios({
      url: `${baseUrl}/rsociales/${id}`,
      method: 'GET'
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
export async function saveRsocial (data) {
  try {
    // eslint-disable-next-line no-undef

    const datarsocial = JSON.stringify({
      rzsocial: data.rzsocial,
      rzruc: data.rzruc
    })
    console.log(datarsocial)
    const response = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${baseUrl}/rsociales`,
      method: 'POST',
      data: datarsocial
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
