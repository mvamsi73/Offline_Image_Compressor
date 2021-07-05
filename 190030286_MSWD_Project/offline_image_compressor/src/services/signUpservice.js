import UserService from './users'
const SignUpService=async (object)=>{
   const request= await UserService.create(object)
   return request
}
export default SignUpService