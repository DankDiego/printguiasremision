import React, { Component } from 'react'

import notfoundimg from '../../statics/404notfound.png'
import { Link } from 'react-router-dom'
class NotFoundScreen extends Component {
  render () {
    return (
      <div class='min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative'>
        <div class='flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left'>
          <div class='w-full md:w-1/2'>
            <div class='mb-10 md:mb-20 text-gray-600 font-light'>
              <h1 class='font-black uppercase text-3xl lg:text-5xl text-indigo-700 mb-10'>Error 404</h1>
              <p>La pagina que estas buscando no existe.</p>
              <p>Vuelve al inicio con el siguiente enlace:</p>
            </div>
            <div class='mb-20 md:mb-0'>
              <Link to='/'>
                <button
                  type='button'
                  class='border border-black-400 bg-black text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-pink-300 focus:outline-none focus:shadow-outline'
                >
                  Volver al Inicio
                </button>
              </Link>
            </div>
          </div>
          <div class='w-full md:w-1/2 text-center'>
            <img src={notfoundimg} class='w-65 h-66' />

          </div>
        </div>
        <div class='w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform' />
        <div class='w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform' />
      </div>
    )
  }
}

export default NotFoundScreen
