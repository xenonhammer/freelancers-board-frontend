import {SHOW_SEARCH_BOARD, HIDE_SEARCH_BOARD} from '../types'

const initialState = {
  visibleSearchBoard: false,
}

export default function searchBoard(state = initialState, action){
  if(action.type === SHOW_SEARCH_BOARD){

    
    return  { ...state.visibleSearchBoard, visibleSearchBoard: true }

  }else if(action.type === HIDE_SEARCH_BOARD){

    return { ...state.visibleSearchBoard, visibleSearchBoard: false }

  }else{
    return state
  }
}