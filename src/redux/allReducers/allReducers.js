import { combineReducers } from 'redux';

import searchBoard    from './SearchBoardReducer';
import search         from './searchReducer';
import favoritesBoard from './FavoritesBoardReducer';
import maindData     from './dataReducer';
import modalWindow    from './ModalWindowReducer';
import bord           from './BordReducer';
import partners       from './partnersReducer';
import sorting        from './sortingReducer';
import favorite       from './favoriteReducer';
import loading        from './loading';
import switchData     from './switchDataReducer';
import category    from './categoryReducer';
import categoryBoard   from './categoryBoardReducer'
import warning    from './warningReducer'

export default combineReducers({

  searchBoard,
  search,
  favoritesBoard,
  maindData,
  modalWindow,
  bord,
  partners,
  sorting,
  favorite,
  loading,
  switchData,
  category,
  categoryBoard,
  warning,
  
})