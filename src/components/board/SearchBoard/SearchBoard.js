import React from "react";
import '../optionsBoard.css';
import { connect } from "react-redux";
import { HIDE_SEARCH_BOARD, START_SEARCHING } from '../../../redux/types'
import { Transition } from "react-spring/renderprops";

class SearchBoard extends React.Component{

  render(){
    return(
  <Transition  
      items={this.props.visibleSearchBoard}
      from={{opacity: 0,  transform: 'rotateY(-90deg) translateX(200px)'}}
      enter={{opacity: 1, transform: 'rotateY(0deg) translateX(0)'}}
      leave={{opacity: 0, transform: 'rotateY(0deg) translateX(-100px)'}}
      >
      {item => 
        item && (props => (
      
        <div  
        style={props}
        className= "options-board">
            <div 
              className="close-wrap">
              
              <div className="options-title">
                Поиск
              </div>

              <button
                onClick={() => this.props.searchBoard(HIDE_SEARCH_BOARD)}
                className="box"
                >x
              </button>

            </div>

            <form className="form-search">
              <input 
                className   = "input"
                onChange    = {this.props.setSearchValue} 
                placeholder = "Введите ключевое слово" 
              />
              <button 
                onClick={e => {
                   e.preventDefault(); 
                   this.props.search(START_SEARCHING); 
                   this.props.searchBoard(HIDE_SEARCH_BOARD)
                }}
                className="box"
                >Искать
              </button>
            </form>
        </div>))}
      </Transition>
      )
    // }else{
    //   return null
    // }
  }
}
export default connect(
  state => ({ 
    visibleSearchBoard: state.searchBoard.visibleSearchBoard
   }),
  dispatch => ({
    searchBoard: (type) => {
      dispatch({ type: type })
    },
    search: (type) => {
      dispatch({ type: type})
    }
  })
  
)(SearchBoard);