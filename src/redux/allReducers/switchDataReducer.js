import { ENABLE_KWORK, DISABLE_KWORK, START_DOWNLOADING_KWORK, STOP_DOWNLOADING_KWORK, START_DOWNLOADING_FREELANCE_RU, STOP_DOWNLOADING_FREELANCE_RU, ENABLE_FREELANCE_RU, DISABLE_FREELANCE_RU } from '../types'

const initialState = {
    enableKwork: false,
    downloadingKwork: false,
    enableFreelanceRu: false,
    downloadingFreelanceRu: false,
}

export default  function switchData (state = initialState, action){
    if(action.type === ENABLE_KWORK){
        return {...state, enableKwork: true}
    }else if(action.type === DISABLE_KWORK){
        return {...state, enableKwork: false}
    }else if (action.type === START_DOWNLOADING_KWORK){
        return {...state, downloadingKwork: true}
    }else if (action.type === STOP_DOWNLOADING_KWORK){
        return {...state, downloadingKwork: false}
        
    }else if (action.type === ENABLE_FREELANCE_RU){
        return {...state, enableFreelanceRu: true}
    }else if (action.type === DISABLE_FREELANCE_RU){
        return {...state, enableFreelanceRu: false}
    }else if (action.type === START_DOWNLOADING_FREELANCE_RU){
        return {...state, downloadingFreelanceRu: true}
    }else if (action.type === STOP_DOWNLOADING_FREELANCE_RU){
        return {...state, downloadingFreelanceRu: false}
    }else{
        return state
    }
}