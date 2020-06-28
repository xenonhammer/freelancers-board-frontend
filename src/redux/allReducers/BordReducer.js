import { GET_MORE_ITEMS, SET_START_COUNT_ITEM } from '../types';

const initialState = { 
  countOfItemsShow: 10
}

export default function bord(state = initialState, action){

  if(action.type === GET_MORE_ITEMS){
    return {...state,
      countOfItemsShow: (()=> Math.min(state.countOfItemsShow + 5, Object.keys(action.data).length ? Object.keys(action.data).length : 10))() }
  }else if(action.type === SET_START_COUNT_ITEM){
    return {...state,
    countOfItemsShow: 15}
  }else{
    return state
  }
    
}