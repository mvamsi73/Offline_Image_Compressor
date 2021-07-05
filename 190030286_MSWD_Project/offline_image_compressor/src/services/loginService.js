import UserService from './users'
const SignInService=async (object)=>{
   const response= await UserService.login(object)
   return response
}
export default SignInService