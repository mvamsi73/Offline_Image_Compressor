import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {  
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }
  const login=async newObject=>{
      const response=await axios.post('/api/login',newObject)
      return response.data
  }
const funs={getAll , create, login}
  export default funs