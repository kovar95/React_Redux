import React from 'react';
import './Card.scss';
import moreDet from '../../images/info.png';
import favourites from '../../images/favourites.png';
import fav from '../../images/fav.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

const Card = ({
  missionName,
  flightNumber,
  launchYear,
  imageLink,
  element,
  onMoreUpdate,
  onFavouritesDataUpdate,
  filteredData,
  isFavouritesSection,
}) => (
  <div className={`${isFavouritesSection ? 'favy' : 'card'}`}>
    <span>
      <strong>Flight number:</strong>
      <br /> &rarr; {flightNumber}
    </span>
    <span>
      <strong>Mission name:</strong>
      <br /> &rarr; {missionName}
    </span>
    <span>
      <strong>Year:</strong>
      <br /> &rarr; {launchYear}
    </span>
    <img src={imageLink} alt="link" />
    <Link to="/preview">
      <div className="more" onClick={() => onMoreUpdate(flightNumber)}>
        <img src={moreDet} alt="more" />
      </div>
    </Link>
    {!isFavouritesSection && (
      <div
        className="fav"
        onClick={() => onFavouritesDataUpdate(element, filteredData)}
      >
        <img src={element.favourite ? fav : favourites} alt="fav" />
      </div>
    )}
  </div>
);

const mapStateToProps = (state) => {
  return {
    filteredData: state.filteredData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFavouritesDataUpdate: (sentElement, filteredData) =>
      dispatch(actionCreators.getFavouritesData(sentElement, filteredData)),
    onMoreUpdate: (flightNumber) =>
      dispatch(actionCreators.getMore(flightNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
