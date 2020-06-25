import React from 'react';
import { connect } from 'react-redux';
import { ENABLE_KWORK, DISABLE_KWORK, START_DOWNLOADING_KWORK, DISABLE_FREELANCE_RU, ENABLE_FREELANCE_RU, START_DOWNLOADING_FREELANCE_RU } from '../../../redux/types';
import { Trail, animated, config } from 'react-spring/renderprops';



class TopMenuItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      freelanceExchange: [
        {
            name: 'KWORK', 
            enable: ()=> this.props.enableKwork,
            setDisable: () => this.props.switchData(DISABLE_KWORK),
            setEnabled: () => this.props.switchData(ENABLE_KWORK),
            setStartDownload: () => this.props.switchData(START_DOWNLOADING_KWORK),
            key: 'kwork'
        },
        {
            name: 'FREELANCE.RU',
            enable:  ()=> this.props.enableFreelanceRu,
            setDisable: () => this.props.switchData(DISABLE_FREELANCE_RU),
            setEnabled: () => this.props.switchData(ENABLE_FREELANCE_RU),
            setStartDownload: () => this.props.switchData(START_DOWNLOADING_FREELANCE_RU),
            key: 'freelanceRu'
        },
      ]
    }    
  }
  render() {
    const items = Object.values(this.state.freelanceExchange)
    return(
      <div style={{height:0}}>
        <Trail
          config={config.default}
          native
          initial={null}
          items={items}
          keys={items => items.key}
          from={{ x: -110, opacity: 1, height:0 }}
          to={{  
            x: this.props.visibleMenu ? 0: -110,
            opacity: this.props.visibleMenu ? 1: 0,
            paddingTop: this.props.visibleMenu ? 5: 0,
            paddingBottom: this.props.visibleMenu ? 5: 0,
            paddingLeft: this.props.visibleMenu ? 10: 0,
            paddingRight: this.props.visibleMenu ? 10: 0,
            height: this.props.visibleMenu ? 30: 0 }}
        > 
          {items => ({ x, opacity, height, paddingTop, paddingBottom, paddingLeft, paddingRight }) => (
            <animated.div 
              onClick ={items.enable() 
              ?() => items.setDisable() 
              :() => {items.setEnabled();  items.setStartDownload()}}
              style={{
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                height,
                opacity,
                transform: x.interpolate(x => `translate3d(${x.toFixed(0)}%,0,0)`)
              }}
              className = {items.enable() 
              ? "box active-menu"
              : "box"}
               >
               { ( () => items.name )(items) }
            </animated.div>
          )}
        </Trail>
      </div>
    )
  }
} 
export default connect(
  state => ({
    enableKwork:              state.switchData.enableKwork,
    enableFreelanceRu:        state.switchData.enableFreelanceRu,
    downloadingKwork:         state.switchData.downloadingKwork,
    downloadingFreelanceRu:   state.switchData.downloadingFreelanceRu
  }),
  dispatch => ({
    switchData: (type) => {
      dispatch({ type })
    }
  })
) (TopMenuItem);