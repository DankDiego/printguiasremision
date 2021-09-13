import React, { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = '/api'
const PrivateScreen = ({ history }) => {
  const [error, setError] = useState('')
  const [privateData, setPrivateData] = useState('')
  /* const logoutHandler = () => {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('SessionData')
    history.push('/')
  } */
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('authToken')}`
        }
      }

      try {
        const { data } = await axios.get(`${baseUrl}/private`, config)
        setPrivateData(data.data)
      } catch (error) {
        window.localStorage.removeItem('authToken')
        window.localStorage.removeItem('SessionData')
        setError('Sesion expirada vuelve a ingresar')
        history.push('/login')
      }
    }

    fetchPrivateDate()
  }, [])
  return error
    ? (
      <span className='error-message'>{error}</span>
      )
    : (
      <>
        <main style={{ background: 'green', color: 'white' }}>
          <div className='main__container'> {privateData}
          </div>
          <div />
        </main>
      </>
      )
}

export default PrivateScreen
