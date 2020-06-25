import { START_SEARCHING, STOP_SEARCHING } from "../types"


const initialState = {
  searching:              false,
  visibleButtonSearching: false
}

export default function search(state = initialState, action){
  if(action.type === START_SEARCHING ){

    return  { 
      ...state.searching, 
      searching: true, 
      visibleButtonSearching: true 
    }

  }else if(action.type === STOP_SEARCHING){

    return { 
      ...state.searching, 
      searching: false, 
      visibleButtonSearching: false 
    }

  }else{
    return state
  }
}