import React from 'react';
import '../optionsBoard.css'
import { connect } from 'react-redux';
import { Transition } from 'react-spring/renderprops';
import { 
  HIDE_CATEGORY_BOARD, 
  CATEGORY_SELECTED, 
  SET_CATEGORY_IT, 
  SET_CATEGORY_DESIGN, 
  SET_CATEGORY_TEXT, 
  SET_CATEGORY_SEO, 
  SET_CATEGORY_SOCIAL, 
  SET_CATEGORY_AUDIOVIDEO, 
  SET_CATEGORY_BUSINESS, 
  OPEN_WARNING_TOP_MENU,
  SET_CATEGORY_LAST_CHANGED,
  OPEN_WARNING_RELOAD_DATA, 
} from '../../../redux/types';

class CategoryBoard extends React.Component{

    render(){
        return(
          <Transition  
          items={this.props.visibleCategoryBoard}
          from={{opacity: 0,  transform: 'rotateY(-90deg) translateX(200px)'}}
          enter={{opacity: 1, transform: 'rotateY(0deg) translateX(0)'}}
          leave={{opacity: 0, transform: 'rotateY(0deg) translateX(-100px)'}}
          >
          {item => 
            item && (props => (

            <div 
              style={props}
              className = "options-board">
              <div className="close-wrap">
                <div 
                  className="options-title"
                  >Категории 
                </div>

                <button
                  onClick={() => this.props.categoryBoard(HIDE_CATEGORY_BOARD)}
                  className="box"
                  >x
                </button>

              </div>
              <form className = "category-list">
                <label>
                  <span className = "icon-category"></span>
                  <input 
                  onClick = {() => this.props.category(SET_CATEGORY_DESIGN)}
                  defaultChecked={this.props.categoryChecked === "design"} 
                  type="radio" 
                  name="category-list" 
                  value="design" 
                  id ="design" 
                />
                  <span className="text">Дизайн</span>
                </label>

                <label>
                  <span className = "icon-category"></span>
                  <input 
                    onClick = { () => this.props.category(SET_CATEGORY_IT)}
                    defaultChecked={this.props.categoryChecked === "it"} 
                    type="radio" 
                    name="category-list" 
                    value="it" 
                    id ="it" 
                  />
                  <span className="text"> Разработка и IT</span> 
                </label>

                <label>
                  <span className = "icon-category"></span>
                  <input 
                    onClick = {() => this.props.category(SET_CATEGORY_TEXT)}
                    defaultChecked={this.props.categoryChecked === "text"} 
                    type="radio" 
                    name="category-list" 
                    value="text" 
                    id ="text"
                  />
                  <span className="text">Тексты и переводы</span>
                </label>

                <label>
                  <span className = "icon-category"></span>
                  <input 
                    onClick = {() => this.props.category(SET_CATEGORY_SEO)}
                    defaultChecked={this.props.categoryChecked === "seo"}   
                    type="radio" 
                    name="category-list" 
                    value="seo" 
                    id ="seo"
                  />
                  <span className="text">SEO</span>
                </label>

                <label>
                  <span className = "icon-category"></span>
                  <input 
                    onClick = {() => this.props.category(SET_CATEGORY_SOCIAL)}
                    defaultChecked={this.props.categoryChecked === "social"}  
                    type="radio" 
                    name="category-list"
                    value="social" 
                    id ="social"
                  />
                  <span className="text">Социальные сети</span>
                </label>

                <label>
                  <span className = "icon-category"></span>
                  <input 
                    onClick = {() => this.props.category(SET_CATEGORY_AUDIOVIDEO)}
                    defaultChecked={this.props.categoryChecked === "audiovideo"}  
                    type="radio" 
                    name="category-list" 
                    value="audio-video" 
                    id ="audio-video"
                  />
                  <span className="text">Аудио- видеосъемка</span>
                </label>

                <label>
                 <span className = "icon-category"></span>
                  <input 
                    onClick = {() => this.props.category(SET_CATEGORY_BUSINESS)}
                    defaultChecked={this.props.categoryChecked === "business"}  
                    type="radio" 
                    name="category-list" 
                    value="bisnes" 
                    id ="bisnes"
                  />
                  <span className="text">Бизнес</span>
                </label>
              </form>
              <button 
              
                onClick   = {()=>{
                (async ()=>{ if (this.props.categoryChecked !== this.props.categoryLastChanged && this.props.categoryLastChanged !== null ){
                  await this.props.warning(OPEN_WARNING_RELOAD_DATA);
                  this.props.category(SET_CATEGORY_LAST_CHANGED); 
                  }else{
                    this.props.category(SET_CATEGORY_LAST_CHANGED); 
                  }})()
                  this.props.warning(OPEN_WARNING_TOP_MENU);
                  this.props.category(CATEGORY_SELECTED);
                  this.props.categoryBoard(HIDE_CATEGORY_BOARD);
                }}
                className = "box inline-box">Выбрать
              </button>
            </div>))}
      </Transition>
        )
    }
} export default connect(
  state => ({
    enableKwork:                 state.switchData.enableKwork,
    enableFreelanceRu:           state.switchData.enableFreelanceRu,
    visibleCategoryBoard:        state.categoryBoard.visibleCategoryBoard,
    categoryChecked:             state.category.categoryChecked,
    categoryLastChanged:         state.category.categoryLastChanged
  }),
  dispatch => ({
    categoryBoard: (type) => {
      dispatch({ type })
    },
    category: (type) => {
      dispatch({ type })
    },
    warning: (type) => {
      dispatch({ type })
  }
  })
) (CategoryBoard)

