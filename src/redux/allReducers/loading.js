import { IS_LOADING, IS_NOT_LOADING } from "../types"

const initialState = {
    loading: false
}

export default function loading(state = initialState, action){
    if(action.type === IS_LOADING){
        return {...state,
        loading: true
        }
    }else if(action.type === IS_NOT_LOADING){
        return {...state,
        loading: false
        }
    }else{
        return state
    }
}