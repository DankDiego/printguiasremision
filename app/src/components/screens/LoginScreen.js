import React, { useState, useEffect } from 'react'
import swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = '/api'
const LoginScreen = ({ history }) => {
  const tech2 = 'https://res.cloudinary.com/dsulcam/image/upload/v1631501097/sand_wqb5wa.jpg'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  /* const [error, setError] = useState('') */

  useEffect(() => {
    if (window.localStorage.getItem('authToken')) {
      history.push('/dashboard')
    }
  }, [history])

  const loginHandler = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/login`,
        { email, password },
        config
      )
      const SessionData = {
        nombre: data.nombre,
        correo: data.email
      }
      window.localStorage.setItem('authToken', data.token)
      window.localStorage.setItem('SessionData', JSON.stringify(SessionData))
      history.push('/dashboard')
    } catch (error) {
      swal.fire({
        title: 'Algo salió mal',
        icon: 'warning',
        text: `${error.response.data.error}`
      })
      /* setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 5000) */
    }
  }

  return (
    <>
      <div id='section' className='location__header' />
      <div id='section' className='location__header' />
      <div>

        <div className='container mx-auto'>
          <div className='flex justify-center px-6 my-12'>

            <div className='w-full xl:w-3/4 lg:w-11/12 flex'>

              <div className='w-full h-auto lg:w-1/2 bg-black p-5 rounded-l-lg lg:rounded-l-lg'>
                <h1 className='text-center text-white font-bold text-2xl uppercase'>Inicio de Sesion</h1>

                <form onSubmit={loginHandler} className='px-8 pt-6 pb-8 mb-4 bg-black rounded'>

                  <div className='mb-4'>
                    <label className='block mb-2 text-sm font-bold text-white'>
                      Ingresa tu ID
                    </label>
                    <input
                      className='w-full px-3 py-2 text-sm leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      type='text'
                      required
                      id='email'
                      placeholder='usuario'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      tabIndex={1}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-sm font-bold text-white'>
                      Contraseña
                    </label>
                    <input
                      className='w-full px-3 py-2 text-sm leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      type='password'
                      id='password'
                      autoComplete='true'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      tabIndex={2}
                      placeholder='******************'
                    />
                  </div>

                  <div className='mb-6 text-center'>
                    <button
                      className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                      type='submit'
                    >
                      Entrar
                    </button>
                  </div>
                  <hr className='mb-6 border-t' />
                  <div className='text-center'>
                    <p className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                      D&H Contratistas Generales S.A.C
                    </p>
                  </div>
                  <div className='text-center'>
                    <p className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                      2021
                    </p>
                  </div>

                </form>

              </div>
              <div
                className='w-full h-auto bg-black hidden lg:block lg:w-1/2 bg-cover rounded-r-lg'
                style={{
                  backgroundImage: `url(${tech2})`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginScreen
