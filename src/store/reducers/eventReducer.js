const initState = {}

const eventReducer = (state = initState, action) => {
  console.log("reducer receive action "+Object.keys(action))


  switch (action.type) {
    case 'CREATE_EVENT_SUCCESS':
      console.log('create event success');
      return state;
    case 'SELECT_EVENT_SUCCESS':
      console.log('select event success');
      return state;  
    case 'CREATE_EVENT_ERROR':
      console.log('create event error');
      return state;

      case 'SELECT_EVENT_ERROR':
      console.log('select event success');
      return state; 
      case 'CREATE_SELECTED_TIMESTAMP_SUCCESS':
      console.log('selected timstamp success');
      return state; 
      case 'CREATE_SELECTED_TIMESTAMP_ERROR':
      console.log('selected timstamp error');
      return state; 
      case 'TIMESTAMP_COUNTER':
  
        return {
          ...state,
          timestampCounter: action.data
        }

    default:
      return state;
  }
};

export default eventReducer;