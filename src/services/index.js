 const BASE_URL =process.env.REACT_APP_BASE_URL;

// register,login,logout
// const login = BASE_URL + '/api/authenticate'
// const register = BASE_URL + '/auth/register'
 const login ='localhost:8080/auth/login'
   const register = 'localhost:8080/auth/register'
const data = BASE_URL

const requests = {
  login,
  register,
  data
}
export default requests