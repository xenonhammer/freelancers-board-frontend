import React from 'react';
import './main-board.css';
import { connect } from 'react-redux';
import { 
    HIDE_SEARCH_BOARD, 
    SHOW_SEARCH_BOARD, 
    HIDE_FAVORITES_BOARD, 
    SHOW_FAVORITES_BOARD, 
    UP_SORTING, 
    DOWN_SORTING, 
    STOP_SORTING, 
    SHOW_CATEGORY_BOARD, 
    HIDE_CATEGORY_BOARD, 
    CLOSE_WARNING_CATEGORY,
    START_DOWNLOADING_KWORK,
    START_DOWNLOADING_FREELANCE_RU,
    CLOSE_WARNING_RELOAD_DATA,
    DELET_SOME_DATA,
    KWORK,
    FREELANCE_RU,

} from '../../redux/types';
import { Spring, config, animated } from 'react-spring/renderprops';

class MainBoard extends React.Component{

  render(){
    const isSortToPrice           = this.props.sortToPrice
      
    const isVisibleSearchBoard    = this.props.visibleSearchBoard
    const isVisibleFavoritesBoard = this.props.visibleFavoritesBoard
    const isVisibleCategoryBoard  = this.props.visibleCategoryBoard
    return(

        <section className="main-sec">
            <div className="main-board">
            <Spring 
                from={{transform: 'translateY(-200%)'}} 
                to={{transform:'translateY(0%)'}}
                config={config.slow}
                >
                {props => (<div style={props} className="main-logo">
                    
                    <a href="/" alt="Агрегатор бирж фрилансров" className="">
                        <div className="logo-title"><span>Freelace</span> Board</div>
                        <div className="line"></div>
                        <h1 className="h1">Агрегатор бирж фрилансa</h1>
                    </a>

                </div>)}
            </Spring>
            
            {(!this.props.categorySelected && this.props.warningCategory) && 
            <Spring from={{opacity: 0, marginRight: 90 }} to={{opacity: 1, marginRight: 0 }} config={config.slow}>
                {props=>(<div 
                    style={props}
                    className = "warning"
                    onClick = {() => this.props.warning(CLOSE_WARNING_CATEGORY)}
                > 1. Выберите категорию
                </div>)}
            </Spring> }


            {this.props.warningReloadData &&  
                <div
                    className = "warning warnin-reload"
                    onClick = {() => this.props.warning(CLOSE_WARNING_RELOAD_DATA)}
                > Обновите данные
                </div>}
            
            <div className="main-menu">


            <Spring 
                native
                from={{ transform: 'translateY(-100%)', fontSize: 0 }} 
                to={{   transform:'translateY(0%)', fontSize:18 }}
                config={config.slow}
                >   
                {({fontSize,transform})=>(
                    <animated.div 
                        className="menu-boxs"
                        style={{transform}}>
                    <button 
                        onClick = {()=> {
                            if(isVisibleCategoryBoard){
                                this.props.categoryBoard(HIDE_CATEGORY_BOARD)
                            }else{
                                this.props.categoryBoard(SHOW_CATEGORY_BOARD)
                                this.props.searchBoard(HIDE_SEARCH_BOARD)
                                this.props.favoritesBoard(HIDE_FAVORITES_BOARD)
                            }
                        }}
                        className={isVisibleCategoryBoard ? "box active-box" : this.props.categorySelected ? "box" : "box warning-category"}
                        >
                    </button>

                    <button 
                        onClick   = {() => {
                            if(isVisibleSearchBoard){
                                this.props.searchBoard(HIDE_SEARCH_BOARD)
                            }else{
                                this.props.searchBoard(SHOW_SEARCH_BOARD)
                                this.props.favoritesBoard(HIDE_FAVORITES_BOARD)
                                this.props.categoryBoard(HIDE_CATEGORY_BOARD)
                            }
                        }}
                        className = { isVisibleSearchBoard ? "box active-box" : "box" }
                        >
                    </button>

                    <button 
                        onClick   = {() =>{ 
                            this.props.sorting(UP_SORTING)
                            if(this.props.sorting && this.props.sortingStep === 1) return this.props.sorting(DOWN_SORTING)
                            else if(this.props.sorting && this.props.sortingStep === 2) return this.props.sorting(STOP_SORTING)
                            }}
                        className = { isSortToPrice? "box active-box" : "box" }
                        >
                        <span 
                            className = "sort-wrap"
                        >
                            <span className = { this.props.sortingStep === 2 ? "sort-down sort-active" : "sort-down"}
                            ></span>
                            <span className = { this.props.sortingStep === 1 ? "sort-up sort-active" : "sort-up"}
                            ></span>
                        </span>
                    </button>

                    <button 
                        className="box"
                        onClick={()=>{
                            this.props.warning(CLOSE_WARNING_RELOAD_DATA)
                            if(this.props.enableKwork){
                                (async ()=>{
                                    await this.props.maindData(DELET_SOME_DATA, KWORK)    
                                        this.props.switchData(START_DOWNLOADING_KWORK)
                                })()
                                
                            }
                            if(this.props.enableFreelanceRu){
                                (async () => {
                                    await this.props.maindData(DELET_SOME_DATA, FREELANCE_RU)
                                        this.props.switchData(START_DOWNLOADING_FREELANCE_RU)
                                })()
                                
                            }}}
                        >
                    </button>
              
                    <button 
                        onClick   = {() => {
                            if(isVisibleFavoritesBoard){
                                this.props.favoritesBoard(HIDE_FAVORITES_BOARD)
                            }else{
                                this.props.favoritesBoard(SHOW_FAVORITES_BOARD)
                                this.props.searchBoard(HIDE_SEARCH_BOARD)
                                this.props.categoryBoard(HIDE_CATEGORY_BOARD)
                            }
                        }}
                        className = { isVisibleFavoritesBoard ? "box favorite-btn active-box" : "box favorite-btn" }
                        > 
                        {this.props.countOfFavorites > 0 && 
                        <Spring 
                            key={this.props.countOfFavorites}
                            from={{ opacity: 0, bottom: 20, transform: 'rotateY(-90deg)'}}
                            to={{opacity: 1, bottom: 4, transform: 'rotateY(360deg)'}}>    
                            {({ opacity, bottom, transform }) => (
                                <span
                                    style={{opacity, bottom, transform }}                    
                                    className = "count-wrap">
                                <span
                                    className = "count-favorite"
                                    >{this.props.countOfFavorites}
                                </span>
                            </span>)}
                        </Spring>}
                    </button>

                </animated.div>)}
            </Spring>                 
            </div>
        </div>
    </section>
    )
  }
}
export default connect(
    state => ({
        warningReloadData:     state.warning.warningReloadData,
        warningCategory:       state.warning.warningCategory,
        categorySelected:      state.category.categorySelected,
        visibleCategoryBoard:  state.categoryBoard.visibleCategoryBoard,
        visibleSearchBoard:    state.searchBoard.visibleSearchBoard,
        visibleFavoritesBoard: state.favoritesBoard.visibleFavoritesBoard,
        sortToPrice:           state.sorting.sortToPrice,
        sortingStep:           state.sorting.sortingStep,
        countOfFavorites:      state.favorite.countOfFavorites,
        enableKwork:           state.switchData.enableKwork,
        enableFreelanceRu:     state.switchData.enableFreelanceRu
    }),
    dispatch => ({
        searchBoard: (type) => {
            dispatch({ type })
          },
        favoritesBoard: (type) => {
            dispatch({ type })
        },
        sorting: (type) => {
            dispatch({ type })
        },
        switchData: (type) => {
            dispatch({ type })
        },
        categoryBoard: (type) => {
            dispatch({ type })
        },
        warning: (type) => {
            dispatch({ type })
        },
        maindData: (type, data) => {
            dispatch({ type, data })
        },
    })
) (MainBoard)