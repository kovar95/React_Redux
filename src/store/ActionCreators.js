import * as actionTypes from './ActionTypes';
import { Communicators } from '../Communicators';

const formatData = (myData) => {
  const data = [];
  for (const property in myData) {
    data.push({
      ...myData[property],
      id: property,
    });
  }

  data.forEach((item) => {
    if (!item.links) {
      item.links = {};
      item.links.mission_patch_small =
        'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png';
    }
  });

  return data;
};

const updateData = (data, favouritesData) => {
  return {
    type: actionTypes.DATA_UPDATE,
    data: data,
    favouritesData: favouritesData,
  };
};

const updateFavourites = (favouritesData, filteredData) => {
  return {
    type: actionTypes.FAVOURITES_DATA_UPDATE,
    favouritesData: favouritesData,
    filteredData: filteredData,
  };
};

const updateMore = (more) => {
  return {
    type: actionTypes.MORE_UPDATE,
    more: more,
  };
};

export const updateFilteredData = (filteredData) => {
  return {
    type: actionTypes.FILTER_DATA_UPDATE,
    filteredData: filteredData,
  };
};

export const getData = () => {
  return (dispatch) => {
    Communicators.Fetch()
      .then((myJson) => {
        const formatedData = formatData(myJson);
        const favouriteData = formatedData.filter((item) => item.favourite);
        dispatch(updateData(formatedData, favouriteData));
      })
      .catch((error) => alert(`Error: ${error}`));
  };
};

export const getFavouritesData = (element) => {
  return (dispatch) => {
    element.favourite = !element.favourite;
    Communicators.Put(element)
      .then((response) => {
        if (response.ok) {
          Communicators.Fetch()
            .then((myJson) => {
              const formatedData = formatData(myJson);
              const favouriteData = formatedData.filter(
                (item) => item.favourite
              );
              dispatch(updateFavourites(favouriteData, formatedData));
            })
            .catch((error) => alert(`Error: ${error}`));
        }
      })
      .catch((error) => alert(`Error: ${error}`));
  };
};

export const getMore = (flightNumber) => {
  return (dispatch) => {
    Communicators.More(flightNumber)
      .then((myJson) => dispatch(updateMore(myJson)))
      .catch((error) => alert(`Error: ${error}`));
  };
};
