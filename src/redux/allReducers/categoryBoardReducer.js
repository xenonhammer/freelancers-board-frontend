import { SHOW_CATEGORY_BOARD, HIDE_CATEGORY_BOARD } from "../types"

const initialState = {
    visibleCategoryBoard: false,
    visibleReloadButton: false
}

export default function categoryBoard (state = initialState, action){
    if(action.type === SHOW_CATEGORY_BOARD){
        return {
            ...state,
            visibleCategoryBoard: true
        }
    }else if(action.type === HIDE_CATEGORY_BOARD){
        return {
            ...state,
             visibleCategoryBoard: false 
        }
    }else{
        return state
    }
}