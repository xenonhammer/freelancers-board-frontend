import React from 'react';
import './App.css';
import TopMenu from '../components/TopMenu/TopMenu';
import Board from '../components/board/Board';
import MainBoard from '../components/MainBoard/MainBoard';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.setSearchValue           = this.setSearchValue.bind(this);
    this.setSearchValueNull       = this.setSearchValueNull.bind(this);
    
    this.state = {
      searchValue: '',
    };
  }
  setSearchValue(e){
    this.setState({ searchValue: e.target.value })
  }
  setSearchValueNull(){
    this.setState({ setSearchValue: '' })
  }
  render(){
    return (
      <div className="App">
        <MainBoard />

        <TopMenu />
        
        <Board 
          /* Данные для поиска */ 
          searchValue              = {this.state.searchValue}
          setSearchValue           = {this.setSearchValue}
          setSearchValueNull       = {this.setSearchValueNull}
          
        />
      </div>
    );
  };
}

export default App;