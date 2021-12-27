import React, { useEffect, useState } from 'react';
import './App.scss';
import Cards from './components/Cards/Cards';
import Preview from './components/Preview/Preview';
import Header from './components/Header/Header';
import Favourites from './components/Favourites/Favourites';
import { sortData } from './helper';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/ActionCreators';

const App = ({
  onDataUpdate,
  onFilteredDataUpdate,
  filteredData,
  more,
  favouritesData,
}) => {
  useEffect(() => {
    onDataUpdate();
  }, [onDataUpdate]);

  const [showFavourites, setShowFavourites] = useState(true);

  const {
    flight_number,
    launch_year,
    mission_name,
    details,
    links,
    launch_success,
    rocket,
  } = more;

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header />

          <button
            className="sort"
            onClick={() => onFilteredDataUpdate(sortData(filteredData))}
          >
            Sort
          </button>
          <Cards missions={filteredData} />

          <Favourites
            missions={favouritesData}
            showFavourites={showFavourites}
            setShowFavourites={setShowFavourites}
          />
        </Route>

        <Route exact path="/preview">
          {more && (
            <Preview
              flightNumber={flight_number}
              launchYear={launch_year}
              missionName={mission_name}
              moreDetails={details}
              flightPic={links.flickr_images}
              launchSucces={launch_success}
              nationality={rocket.second_stage.payloads[0].nationality}
              missionSimbol={links.mission_patch_small}
            />
          )}
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    filteredData: state.filteredData,
    favouritesData: state.favouritesData,
    more: state.more,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDataUpdate: () => dispatch(actionCreators.getData()),
    onFilteredDataUpdate: (filteredData) =>
      dispatch(actionCreators.updateFilteredData(filteredData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
