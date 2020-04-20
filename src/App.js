import React, {Fragment} from 'react';
import './App.scss';
import {Cards} from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';
import {Favourites} from './components/Favourites/Favourites';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/ActionCreators';

class App extends React.Component {

  componentDidMount(){
    this.props.onDataUpdate(); 
  }

  sortFlights(a,b){
    const nameA = a.mission_name.toLowerCase();
    const nameB = b.mission_name.toLowerCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  sort() {
    const filterArr = [...this.props.filteredData];
    filterArr.sort(this.sortFlights);
    this.props.onFilteredDataUpdate(filterArr);
  }

  render() {
    const {filteredData, more, favouritesData} = this.props;
    const {flight_number, launch_year, mission_name, details, links, launch_success, rocket} = this.props.more;
    
    return (
        <Fragment>
          <Switch>
            <Route exact path="/" >
                <Header />

                <button className="sort" 
                    onClick={ () => this.sort()}>
                    Sort
                </button>

                <Cards missions={filteredData} />

                <Favourites  missions={favouritesData} />

              
            </Route>

            <Route exact path="/preview" >
                {more && <Preview flightNumber={flight_number}
                                  launchYear={launch_year}
                                  missionName={mission_name}
                                  moreDetails={details}
                                  flightPic={links.flickr_images}
                                  launchSucces={launch_success}
                                  nationality={rocket.second_stage.payloads[0].nationality}
                                  missionSimbol={links.mission_patch_small}
                         /> 
                }
            </Route>
          </Switch> 
        </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    data : state.data,
    filteredData : state.filteredData,
    favouritesData: state.favouritesData,
    more: state.more,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDataUpdate : () => dispatch(actionCreators.getData()),
    onFilteredDataUpdate : filteredData => dispatch(actionCreators.updateFilteredData(filteredData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
