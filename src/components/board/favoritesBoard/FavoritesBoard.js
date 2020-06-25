import React from 'react';
import '../optionsBoard.css';
import { connect } from 'react-redux';
import { HIDE_FAVORITES_BOARD, GET_FAVORITES } from '../../../redux/types';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import { Transition } from 'react-spring/renderprops';

class FavoritesBoard extends React.Component{

  componentDidMount(){
    this.props.favorite(GET_FAVORITES)
  }
  render(){
    return(
      <Transition  
      items={this.props.visibleFavoritesBoard}
      from={{opacity: 0,  transform: 'rotateY(-90deg) translateX(200px)'}}
      enter={{opacity: 1, transform: 'rotateY(0deg) translateX(0)'}}
      leave={{opacity: 0, transform: 'rotateY(0deg) translateX(-100px)'}}
      >
      {item => 
        item && (props => (
        <div 
          style={props}
          className= "options-board">
            <div className="close-wrap">
              <div 
                className="options-title"
                >Избранное 
              </div>
              <button
                onClick={() => this.props.favoritesBoar(HIDE_FAVORITES_BOARD)}
                className="box"
                >x
              </button>
            </div>
            {this.props.countOfFavorites ? 
              <ul className = "listing">{
                  
                Object.keys(this.props.favoriteData).map((elem, i) => {
                  return <FavoriteItem favoriteData={this.props.favoriteData[elem]}  key={this.props.favoriteData[elem] + i} />
                })
              }</ul>
              : <p 
                  className = "favorites-board-message"
                  >Выберете объяевление и нажмите "запомнить", чтобы мы его сохранили для Вас
                </p>
            }
        </div>))}
      </Transition>
      )
  }
}
export default connect(
    state => ({
        visibleFavoritesBoard: state.favoritesBoard.visibleFavoritesBoard,
        favoriteData:          state.favorite.favoriteData,
        countOfFavorites:      state.favorite.countOfFavorites 
    }),
    dispatch => ({
        favoritesBoar: (type) => {
            dispatch({ type})
          },
        favorite: (type) => {
          dispatch({ type })
        }
    })
) (FavoritesBoard);