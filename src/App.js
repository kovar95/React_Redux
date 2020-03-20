import React, {Fragment} from 'react';
import './App.scss';
import {Cards} from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';
import {Favourites} from './components/Favourites/Favourites';
import {Communicators} from './Communicators';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from './store/ActionTypes';

class App extends React.Component {

  componentDidMount(){
    this.takeData();
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

  takeData() {
    Communicators.Fetch()
      .then( myJson =>  {
        const formatedData = this.formatData(myJson);
        const favouriteData = formatedData.filter( item => item.favourite);
        this.props.onDataUpdate(formatedData,favouriteData); 

      })
      .catch( error => alert(`Error: ${error}`));
  }

  formatData(myData) {
    const data = [];
      for(const property in myData) {
        data.push({
          ...myData[property],
          id: property,
        });
      }

      data.forEach( item => {
        if(!item.links) {
          item.links = {};
          item.links.mission_patch_small = 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png' ;
        }
      })

      return data
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

                <Favourites missions={favouritesData} />
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
    onDataUpdate : (data, favouritesData) => dispatch({type: actionTypes.DATA_UPDATE , data: data, favouritesData : favouritesData }),
    onFavouritesDataUpdate : favouritesData => dispatch({type: actionTypes.FAVOURITES_DATA_UPDATE , favouritesData: favouritesData}),
    onFilteredDataUpdate : filteredData => dispatch({type: actionTypes.FILTER_DATA_UPDATE , filteredData: filteredData}),
    onMoreUpdate : more => dispatch({type: actionTypes.MORE_UPDATE , more: more}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
