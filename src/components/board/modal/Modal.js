import React from 'react';
import './modal.scss';
import { connect } from 'react-redux';
import { 
  HIDE_MODAL_WINDOW, 
  ADD_IN_FAVORITE, 
  IS_FAVORITE, 
  DEL_FROM_FAVORITE, 
  IS_NOT_FAVORRITE, 
} from '../../../redux/types';
import { Transition, config } from 'react-spring/renderprops';

class Modal extends React.Component{

  render(){
    return(
      <Transition  
      items={this.props.visibleModalWindow}
      key={this.props.dataModal.id}
      config={ config.stiff}
      from={{   opacity: 0,  }}
      enter={{  opacity: 1,  }}
      leave={{  opacity: 0,  }}
      >
      {item => 
        item && (props => (
            <div 
              style={props}
              className = "modal">
                <div className = "head-wrap">
                  <div
                  className  = "item-header"
                  >{this.props.dataModal.title}
                  </div>
                  <button
                  className  = "closeWindow box box-inline"
                  title      = "Закрыть окно"
                  onClick    = {() => {
                    this.props.modalWindow(HIDE_MODAL_WINDOW); 
                    this.props.modalWindow(IS_NOT_FAVORRITE)
                  }}
                  >x
                  </button>
                </div>
                <div className = "line"></div>
                <div 
                  className = "item-desc"
                  >{this.props.dataModal.description}
                </div>
                <div className ="line"></div>
                <div 
                  className = "price"
                  >{this.props.dataModal.price} Р

                </div>
                <div className  = "buttons">
                    <button 
                      title     = "Добавить в избранное"
                      onClick   = {
                        this.props.favoriteButton ? () => {
                          this.props.favorite(DEL_FROM_FAVORITE, this.props.dataModal); 
                          this.props.modalWindow(IS_NOT_FAVORRITE);
                        } : 
                        () => {
                          this.props.favorite(ADD_IN_FAVORITE, this.props.dataModal);
                          this.props.modalWindow(IS_FAVORITE);
                        }
                      }
                      className = { this.props.favoriteButton ? "box box-inline active-menu" :  "box box-inline" }
                    >{this.props.favoriteButton ? "забыть" : "запомнить"}
                    </button>
                    <button 
                      title       = "Перейти на сайт"
                      className   = "box box-inline"
                      onClick     = {() => window.location.href = this.props.dataModal.href}
                    >перейти
                    </button>
                </div>
            </div>))}
        </Transition>
        )
    };
}; 
 export default connect(
  state => ({
      visibleModalWindow: state.modalWindow.visibleModalWindow,
      dataModal:          state.modalWindow.dataModal,
      favoriteData:       state.favorite.favoriteData,
      favoriteButton:     state.modalWindow.favoriteButton
  }),
  dispatch => ({
      modalWindow: (type) => {
          dispatch({ type })
      },
      favorite: (type, data) => {
        dispatch({ type, data})
      },
      animateElement: (type) =>
      dispatch({ type })

  })
)  (Modal);