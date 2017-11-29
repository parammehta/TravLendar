import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';

const reducers = combineReducers({
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer
});

// export default combineReducers({
//   libraries: () => []
// });

export default reducers;
