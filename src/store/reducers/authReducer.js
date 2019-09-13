const initState = {
  authError: null,
  isloged : false
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
        isloged : false
      }

      
      case 'LOGIN_ANONYMOUSLY_ERROR':
      console.log('signInAnonymously error');
      return {
        ...state,
        authError: 'signInAnonymously failed',
        isloged : false
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
        isloged : true
      }

      
      case 'LOGIN_ANONYMOUSLY_SUCCESS':
      console.log('signInAnonymously success');
      return {
        ...state,
        authError: null,
        isloged : true
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {...state, isloged : false};

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;