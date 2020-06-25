import { SET_DATA, DELET_SOME_DATA } from "../types"

const initialState = {
  data : {
    // 1: {
    //     id: 9547851,
    //     title: 'Сделать сайт таплинк',
    //     price: 500,
    //     description:'Нужно сделать сайт на таплинк , наполнить фото, текстом, сделать все нужные кнопки. Возможно найти какие -то иконки для наполнения на сайт',
    //     website: 'flru',
    //     href: 'http://kwork.ru'
    // },
    // 2: {
    //     id: 954851,
    //     title: 'Создание веб-страницы со ссылками',
    //     price: 520,
    //     description:'Нужно создать веб-страницу со ссылками типа Ролловер часть работы в фотошопе и блокноте картинки, которые должны быть на веб-странице я вам предоставлю Нужно к утро чертверга.  Пишите, я скину подробный ТЗ! Оплачу сразу как договоримся!',
    //     website: 'flru',
    //     href: 'http://kwork.ru'
    // },
    // 3: {
    //     id: 947851,
    //     title: 'Обязательно к прочтению!, Срочно ищещу исполнителя! Работа по React.js',
    //     price: 420,
    //     description:'Нужно страницу с товаром на сайте https://shok102.ru (opencart 2.0.1.0) сверстать по шаблону в фигме: 1. https://goo.su/1dl6 - описание2. https://goo.su/1dL7 - хар-ка',
    //     website: 'flru',
    //     href: 'http://kwork.ru'
    // },
  }
}

export default function maindData(state = initialState, action){
    if(action.type === SET_DATA){
        let newState = {...state};
        newState['data'] = action.data
        return  newState;
    }else if(action.type === DELET_SOME_DATA){
        let cloneState = {...state};
        let newState = Object.values(cloneState.data).filter(elem => {
            return elem.website !== action.data  
        })
        return {...state, data: newState}
    }else{
        return state
    }
}