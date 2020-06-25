import { STOP_SORTING, DOWN_SORTING, UP_SORTING } from "../types"


const initialState = {
  sortingStep:        0,
  sortToPrice: false
}



export default function sorting(state = initialState, action){

  if(action.type === UP_SORTING){
    return {
      ...state,
      sortToPrice: true,
      sortingStep: 1
    }
  }else if(action.type === DOWN_SORTING){
    return {
      ...state,
      sortingStep: 2
    }
  }else if(action.type === STOP_SORTING){
    return {
      ...state,
      sortToPrice: false,
      sortingStep: 0
    }
  }else{
    return state
  }
}