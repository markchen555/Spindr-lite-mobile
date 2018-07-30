const initialState = {
  username: null,
  email: null,
  gender: null,
  password: null,
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.passWord,
      }
    case 'REGISTER_USER_DATA':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        gender: action.payload.gender,
        password: action.payload.password,
      }
    default: {
      return state;
    }
  }
}

export default authReducer;