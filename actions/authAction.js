
export const updateUserData = () => dispatch =>  {
  return dispatch({
    type: 'UPDATE_USER_DATA',
    payload: {userName: 'Test', passWord: '123'},
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