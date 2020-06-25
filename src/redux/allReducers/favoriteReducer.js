import { ADD_IN_FAVORITE, DEL_FROM_FAVORITE, GET_FAVORITES } from "../types"

const initialState = {
    favoriteData: {},
    countOfFavorites: 0
}

export default function favorite ( state = initialState, action){
    if(action.type === ADD_IN_FAVORITE){

        for(let key in state.favoriteData){
            if(state.favoriteData[key].id === action.data.id){
                return state
            }
        }
        
        localStorage.setItem(action.data.id, JSON.stringify(action.data))
        let newState = {...state}
        newState.favoriteData[action.data.id] = action.data

        newState.countOfFavorites = Object.keys(newState.favoriteData).length

        return newState
    
    }else if(action.type === DEL_FROM_FAVORITE){
        
        
        localStorage.removeItem(action.data.id)
        let newState = {...state}
        delete newState.favoriteData[action.data.id]

        newState.countOfFavorites = Object.keys(newState.favoriteData).length

        return  newState 

    }else if(action.type === GET_FAVORITES){
        
        let newState = {...state}
        
        Object.keys(localStorage).map(elem => {
            newState.countOfFavorites++
            newState.favoriteData[JSON.parse(elem)] = JSON.parse(localStorage.getItem(elem))
            return newState
        })
        
        return newState
    }else{
        return state
    }

}