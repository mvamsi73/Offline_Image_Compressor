/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react'
const SignUpForm=({
          handleSignUp,
          handleUsernameChange,
          handleEmailChange,
          handlePasswordChange,
          username,
          password,
          email
        }
) => {
    return(
<form onSubmit={handleSignUp}>
<div>
  User Name:
    <input
    type="text"
    value={username}
    name="username"
    onChange={handleUsernameChange}
  />
</div>
<div>
  Email:
    <input
    type="email"
    value={email}
    name="email"
    onChange={handleEmailChange}
  />
</div>
<div>
  Password:
    <input
    type="text"
    value={password}
    name="password"
    onChange={handlePasswordChange}
  />
</div>
<button type="submit">SignUp</button>
</form>
    )}

    export default SignUpForm