import { SHOW_MODAL_WINDOW, HIDE_MODAL_WINDOW, IS_FAVORITE, IS_NOT_FAVORRITE } from '../types';

const initialState = { 
  visibleModalWindow: false,
  favoriteButton: false,
  dataModal: {
    id:          154645,
    title:       'Сделать сайт таплинк',
    description: 'Нужно сделать сайт на таплинк , наполнить фото, текстом, сделать все нужные кнопки. Возможно найти какие -то иконки для наполнения на сайт',
    price:       500,
    href:        1,
  }
}

export default function modalWindow (state = initialState, action){
  if(action.type === SHOW_MODAL_WINDOW){
    
    return ({...state,
      dataModal: action.data, 
      visibleModalWindow: true})
    
  }else if(action.type === HIDE_MODAL_WINDOW){

    return {
      ...state,
      visibleModalWindow: false,
    }

  }else if(action.type === IS_FAVORITE){

    return {
      ...state,
      favoriteButton: true
    }
  }else if(action.type === IS_NOT_FAVORRITE){
    return {
      ...state,
      favoriteButton: false
    }
  }else{
    return  state
  }
}