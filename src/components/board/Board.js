import React from 'react';
import './board.css'
import Item from './Item/Item'
import Modal from './modal/Modal'
import SearchBoard from './SearchBoard/SearchBoard'
import FavoritesBoard from './favoritesBoard/FavoritesBoard';
import CategoryBoard from './categoryBoard/CategoryBoard';
import Greeting from './greeting/Greeting';
import { connect } from 'react-redux'
import { Spring } from 'react-spring/renderprops'
import { STOP_SEARCHING, GET_MORE_ITEMS } from '../../redux/types';

class Board extends React.Component{
    constructor(props){
        super(props)
      
        this.onScroll = this.onScroll.bind(this);

        this.state = {
            notResultMessage: false,
            countSearchResult: 0,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, true);
        
    }
    componentDidUpdate(){

        console.log('Object.keys(this.props.data).length', Object.keys(this.props.data).length)
        console.log('this.props.countOfItemsShow', this.props.countOfItemsShow)
    }

    startSearching(data){
        let searchKey = new RegExp(`(${this.props.searchValue})`, 'mgi')
        let suitableData = {};
        let count = 0;
        for(let item in data){
            if(data[item].description.search(searchKey) !== -1){
                suitableData[count] = data[item]
            }
            count++;
        }
        return suitableData
    }
    scrollUp(){
        document.documentElement.scrollTop = 0
    }
    onScroll () {
        if (document.documentElement.clientHeight + document.documentElement.scrollTop + 50 >= 
            Math.max(
                document.documentElement.clientHeight, 
                document.documentElement.scrollHeight, 
                document.documentElement.offsetHeight
            )
        ){
            this.props.bord(GET_MORE_ITEMS, this.props.data)
        }
    }

    sortingUpData(data = this.props.data){
        data = Object.values(data).map(e => {
            if(+e.price){
                return {...e, price: +e.price}
            }else{
                console.log(e.price)
                return {...e}
            }
        })
        return Object.values(data).sort(
            (a, b) => (typeof b.price === 'string') ? -1 : +a.price - +b.price
        )
    }
    sortingDownData(data = this.props.data){
        data = Object.values(data).map(e => {
            if(+e.price){
                return {...e, price: +e.price}
            }else{
                return {...e}
            }
        })
        return Object.values(data).sort(
            (a, b) => (typeof b.price === 'string') ? -1 : +b.price - +a.price
        )
    }
    render(){
       
        /* Данные*/
        let data = this.props.data
        /*Данные во время поиска*/
        if(this.props.searching) {
            data = this.startSearching(this.props.data)  
         
            /* сортировка по поиску */
            if(this.props.sortToPrice && this.props.sortingStep === 1){
                data = this.sortingUpData(data)
            }else if(this.props.sortingStep === 2){
                data = this.sortingDownData(data)
            }

        }else{
            /* Если поиск отключен */
            if(this.props.sortToPrice && this.props.sortingStep === 1){
                data = this.sortingUpData()
            }else if(this.props.sortingStep === 2){
                data = this.sortingDownData()
            }
        }
        



        return(
            <section className = "board-sec" >
                <div  className="board">
                    { this.props.searching 
                    ? <button 
                            onClick = {() => {this.props.search(STOP_SEARCHING); this.props.setSearchValueNull()}}
                            className = "box active-menu" 
                            >Вернуться
                        </button> 
                    : null }

                    <div
                        className = "items"
                        onScroll = {this.onScroll}
                    >
                        {this.props.loading 
                        ? <Spring 
                            from={{opacity: 0, marginTop: -1000}} 
                            to={{opacity:1, marginTop: 0}} 
                            delay='300'>
                            {props => (
                                <div style={props} 
                                className = "loading"> 
                                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>)}
                        </Spring> 
                        : Object.keys(data).length 
                            ? <div className = "items">
                                <Spring
                                    from={{transform: 'translateX(200px)'}} 
                                    to={{transform: 'translateX(0px)'}}
                                    delay='1000'
                                > 
                                    {(props) => (
                                        <button 
                                            style={props} 
                                            onClick={()=> this.scrollUp()}
                                            className= "up-button"
                                        > 
                                            <span></span> 
                                        </button>
                                    )}
                                </Spring>
                                
                                {Object.keys(data).slice(0, this.props.countOfItemsShow ).map( (elem, i) => {
                                    return  (
                                        <Item 
                                            key = {data[elem]+i} 
                                            data = {data[elem]} 
                                            id = {data[elem].id} 
                                            partners = {this.props.partners} 
                                        />
                                    )
                                })}
                            </div>
                            : <Greeting />
                            }

                    </div>
                    
                    <Modal /> 
                    
                    <SearchBoard
                        /* Стейты */
                        notResultMessage      = {this.state.notResultMessage}
                        /* Пропсы */
                        setSearchValue        = {this.props.setSearchValue}    
                    />

                    <FavoritesBoard />

                    <CategoryBoard /> 

                </div>
            </section>
        )
    };
}; 
export default connect(
    state => ({
        enableKwork:          state.switchData.enableKwork,
        enableFreelanceRu:    state.switchData.enableFreelanceRu,
        visibleCategoryBoard: state.categoryBoard.visibleCategoryBoard,
        loading:              state.loading.loading,
        visibleModalWindow:   state.modalWindow.visibleModalWindow,
        searching:            state.search.searching,
        data:                 state.maindData.data,
        countOfItemsShow:     state.bord.countOfItemsShow,
        sortToPrice:          state.sorting.sortToPrice,
        sortingStep:          state.sorting.sortingStep
    }),
    dispatch => ({
        search: (type) => {
            dispatch({ type: type})
        },
        bord: (type, data) => { 
            dispatch({ type, data})
        },
        maindData: (type) => {
            dispatch({ type })
        },
        switchData: (type) => {
            dispatch({type})
        }
    
        
    })

) (Board);