
export const signInUserData = (userData) => dispatch =>  {
  return dispatch({
    type: 'SIGNIN_USER_DATA',
    payload: userData,
  })
}

export const registerUserData = (authData) => dispatch =>  {
  return dispatch({
    type: 'REGISTER_USER_DATA',
    payload: authData,
  })
}

export const fetchUserData = () => dispatch =>  {
  return dispatch({
    type: 'FETCH_USER_DATA',
    payload: 'Test',
  })
}