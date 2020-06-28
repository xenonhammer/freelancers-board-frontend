import React from 'react';
import './topMenu.css';
import TopMenuItem from './topMenuItem/TopMenuItem';
import { 
    SET_DATA, 
    IS_LOADING, 
    IS_NOT_LOADING, 
    STOP_DOWNLOADING_KWORK, 
    DELET_SOME_DATA, 
    KWORK, 
    STOP_DOWNLOADING_FREELANCE_RU, 
    FREELANCE_RU, 
    SET_START_COUNT_ITEM, 
    CLOSE_WARNING_TOP_MENU, 

} from '../../redux/types';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';

class  TopMenu extends React.Component {
    constructor(props){
        super(props);

        this.showTopMenu = this.showTopMenu.bind(this);
        this.hideTopMenu = this.hideTopMenu.bind(this);

        this.state = {
            visibleMenu: false,
            btnShowTopMenu: 'Показать фриланс биржи',
           
        }
    }
    hideTopMenu(){
        this.setState({ visibleMenu: false, btnShowTopMenu: 'Показать фриланс биржи' })
    }
    showTopMenu(){
        if(this.state.visibleMenu){
            this.hideTopMenu(); 
        } else {
            this.setState({ 
                visibleMenu: true, 
                btnShowTopMenu: 'Скрыть фриланс биржи'
            })}
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        let snapshot = {
            downloadingKwork: this.props.downloadingKwork,
            downloadingFreelanceRu: this.props.downloadingFreelanceRu,
         }
       return snapshot 
    }
    componentDidUpdate(prevProps,prevState,snapshot){
       
        if(this.props.enableKwork  && snapshot.downloadingKwork){
            this.props.switchData(STOP_DOWNLOADING_KWORK)
            this.props.loading(IS_LOADING)
            let url = this.props.category.kworkHref
            fetch(url)
            .then(response =>{ 
                return response.json()
            })
            .then(response => {
                if(response.length) return false
                let modResponse = {...response.kwork}
                let len = Object.keys(this.props.data).length === 0 ? 0 : Object.keys(this.props.data).length
                let obj = {};
                for(let key in modResponse){
                    let index = len + +key
                    obj[index] = modResponse[key]
                }
                let newState = {...this.props.data, ...obj}
                return newState
            })
            .then(newState => {
                if(!newState) return
                else{
                    this.props.maindData(SET_DATA, newState)
                    this.props.loading(IS_NOT_LOADING)
                }}, (error) => console.log(error) 
            )
        }
        if(prevProps.enableKwork && !this.props.enableKwork ){
            this.props.maindData(DELET_SOME_DATA, KWORK)
        }


        if(this.props.enableFreelanceRu  && snapshot.downloadingFreelanceRu){
            this.props.switchData(STOP_DOWNLOADING_FREELANCE_RU)
            this.props.loading(IS_LOADING)
            let url = this.props.category.freelance_ruHref
            fetch(url)
            .then(response =>{ 
                return response.json()
            })
            .then(response => {
                if(response.length) return false
                let modResponse = {...response.freelance_ru}
                let len = Object.keys(this.props.data).length 
                let obj = {};
                for(let key in modResponse){
                    let index = len + +key
                    obj[index] = modResponse[key]
                }
                let newState = {...this.props.data, ...obj}
                return newState
            })
            .then(newState => {
                if(!newState) return
                else{
                    this.props.maindData(SET_DATA, newState)
                    this.props.loading(IS_NOT_LOADING)
                    
                } },   
                (error) => console.log(error)
            )
        
        }
        if(prevProps.enableFreelanceRu && !this.props.enableFreelanceRu ){
            this.props.maindData(DELET_SOME_DATA, FREELANCE_RU)
        }
    };
    render(){
        // let topMenuItems = {
        // }
        
        return(
            <section className="top-menu">
                <div className="fl-boxs">
                    {this.props.categorySelected &&
                    <Spring from={{opacity: 0}} to={{opacity:1}}>                    
                        {props=>(
                        <button 
                            style={props}
                            onClick={() => {this.props.categorySelected &&  this.showTopMenu(); this.props.warning(CLOSE_WARNING_TOP_MENU)}} 
                            className={this.state.visibleMenu ? "box active-menu" : this.props.warningTopMenu && this.props.stepInitial === 1 ? "box warning-top-menu" : "box" }  
                            >{this.state.btnShowTopMenu}
                        </button>)}
                    </Spring>}

                    {(!this.state.visibleMenu && this.props.warningTopMenu && this.props.stepInitial === 1) && 
                    <Spring from={{opacity: 0, marginTop: 300}} to={{opacity:1, marginTop: 0}}>    
                        {props=>(<div
                            style={props} 
                            className = "warning-tp "
                            onClick = {() => this.props.warning(CLOSE_WARNING_TOP_MENU)}
                        > 2. Выберите биржу
                        </div>)}
                    </Spring>}

                    <TopMenuItem visibleMenu={this.state.visibleMenu} />

                </div>
            </section>
        );
    };
} export default connect(
    state => ({
        stepInitial:                 state.warning.stepInitial,
        warningTopMenu:              state.warning.warningTopMenu,
        countOfItemsShow:            state.bord.countOfItemsShow,
        categorySelected:            state.category.categorySelected,
        enableKwork:                 state.switchData.enableKwork,
        enableFreelanceRu:           state.switchData.enableFreelanceRu,
        data:                        state.maindData.data,
        downloadingKwork:            state.switchData.downloadingKwork,
        downloadingFreelanceRu:      state.switchData.downloadingFreelanceRu,
        category:                    state.category.category,
    }),
    dispatch => ({
        maindData: (type, data) => {
            dispatch({ type, data })
        },
        loading: (type) => {
            dispatch({ type })
        },
        switchData: (type) => {
            dispatch({ type })
        },
        bord: (type) => {
            dispatch({ type })
        },
        warning: (type) => {
            dispatch({ type })
        }
    })
  ) (TopMenu)
