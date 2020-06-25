import React from 'react';
import './item.scss';
import { connect } from 'react-redux';
import { SHOW_MODAL_WINDOW, IS_FAVORITE } from '../../../redux/types'

class Item extends React.Component{
    constructor(props){
        super(props);

        this.setHref     = this.setHref.bind(this);
        this.goToPartner = this.goToPartner.bind(this);
    }

    slicedHeader() {
        let insideStr = '';
        if(this.props.data.title.length > 50) {
            insideStr += `${this.props.data.title.slice(0, 50)}...`
        }else{
            return this.props.data.title;
        };
        return insideStr;
    };

    slicedDescription () {
        let insideStr = '';
        if(this.props.data.description.length > 205) {
            insideStr += `${this.props.data.description.slice(0, 205)}...`
        }else{
            return this.props.data.description;
        };
        return insideStr;
    };	

    setHref(){
        let partnersHref = '';
        Object.keys(this.props.partners).map( website => {
            if(this.props.data.website === website){
                
                return partnersHref += this.props.data.href + this.props.partners[website]
                
            }
            return partnersHref = (partnersHref.length !== 0) ?  partnersHref :  this.props.data.href
        });
        return partnersHref
    };

    goToPartner(){
        window.location.href = this.setHref()
    };
    isFavorite(){
        for(let elem in this.props.favoriteData){
            if(+elem === this.props.data.id){
              this.props.modalWindow(IS_FAVORITE)
            }
        }
    }

    render(){

        return(
            <div className="item">
                <div 
                    className="item-header"
                    >{this.slicedHeader ()}
                </div>
                
                <div className="line"></div>
                
                <p 
                    className="item-scale-desc"
                    >{this.slicedDescription ()}
                </p>
                
                <div className="line"></div>
                
                <p 
                    className="price"
                    >{this.props.data.price} Р
                </p>
                
                <div 
                    className="buttons">
                    <button 
                        className="box open-box" 
                        onClick={
                            () => {
                                this.props.modalWindow(SHOW_MODAL_WINDOW, this.props.data)
                                this.isFavorite()
                            }
                        }
                        >подробнее
                    </button>

                    <button 
                        className="box" 
                        onClick={this.goToPartner}
                        >перейти
                    </button>
                </div>

            </div>

            
        )
    }; 
};
export default connect(
    state => ({
        visibleModalWindow: state.modalWindow.visibleModalWindow,
        partners:           state.partners.partners,
        favoriteData:       state.favorite.favoriteData,
    }),
    dispatch => ({
        modalWindow: (type, data) => {
            dispatch({ type, data})
        }
    })
  ) 
 (Item);