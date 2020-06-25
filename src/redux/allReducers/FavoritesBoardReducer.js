import { SHOW_FAVORITES_BOARD, HIDE_FAVORITES_BOARD } from "../types"

const initialState = {
  visibleFavoritesBoard: false,
  favorites: 0
};

export default function favoritesBoard (state = initialState, action){
  if(action.type === SHOW_FAVORITES_BOARD){
    return {
      ...state.favoritesBoard,
      visibleFavoritesBoard: true
    }

  }else if(action.type === HIDE_FAVORITES_BOARD){
    return {
      ...state.favoritesBoard,
      visibleFavoritesBoard: false
    }
  }else{
    return state
  }
}