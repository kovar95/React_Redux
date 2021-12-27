import * as actionTypes from './ActionTypes';

const initialState = {
  data: [],
  more: '',
  filteredData: [],
  favouritesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_UPDATE:
      return {
        ...state,
        data: action.data,
        filteredData: action.data,
        favouritesData: action.favouritesData,
      };

    case actionTypes.FILTER_DATA_UPDATE:
      return {
        ...state,
        filteredData: action.filteredData,
      };

    case actionTypes.FAVOURITES_DATA_UPDATE:
      return {
        ...state,
        favouritesData: action.favouritesData,
        filteredData: action.filteredData,
      };

    case actionTypes.MORE_UPDATE:
      return {
        ...state,
        more: action.more,
      };

    default:
      return state;
  }
};

export { reducer };
