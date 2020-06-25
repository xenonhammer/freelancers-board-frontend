import React from 'react';
import { connect } from 'react-redux';
import { DEL_FROM_FAVORITE } from '../../../../redux/types';

class FavoritItem extends React.Component{
    setHref(){
        let partnersHref = '';
        Object.keys(this.props.partners).map( website => {
            if(this.props.favoriteData.website === website){
                // if(this.props.favoriteData.href[this.props.favoriteData.href.length-1] === '/'){
                partnersHref += this.props.favoriteData.href + this.props.partners[website]
                // }else{
                //     return partnersHref += `${this.props.favoriteData.href}/${this.props.partners[website]}`
                // }
            }
            return partnersHref = (partnersHref.length !== 0) ?  partnersHref :  this.props.favoriteData.href
        });
        return partnersHref
    };
    goToPartner(){
        window.location.href = this.setHref()
    };
    render(){
        return(
            <li 
                className = "favorit-item"
                >
                <div 
                    className = "favorite-item-title">{
                    this.props.favoriteData.title
                }</div>
                <div
                    className = "favorite-item-price">{
                    this.props.favoriteData.price
                } Р </div>
                <button 
                    onClick={() => this.goToPartner()}
                    className = "favorite-item-btn box"
                >Перейти на сайт</button>
                <button 
                    onClick={() => this.props.favorite(DEL_FROM_FAVORITE, this.props.favoriteData)}
                    className = "favorite-item-btn box"
                >Удалить</button>
            </li>
        )
    }
} export default connect(
    state => ({
        partners: state.partners.partners,
    }),
    dispatch => ({
        favorite: (type, data) => {
            dispatch ({ type, data})
        }
    })
) (FavoritItem)