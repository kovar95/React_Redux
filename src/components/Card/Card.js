import React, {Component} from 'react';
import './Card.scss';
import moreDet from '../../images/info.png';
import favourites from '../../images/favourites.png';
import fav from '../../images/fav.png';
import {Link} from 'react-router-dom';
import {Communicators} from '../../Communicators';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/ActionTypes';

class Card extends Component{

	 takeFavourites() {
	    Communicators.Fetch()
	      .then( myJson =>  {
	        const formatedData = this.formatData(myJson);
	        const favouriteData = formatedData.filter( item => item.favourite);
	        this.props.onFavouritesDataUpdate(favouriteData, formatedData);
	      })
	      .catch( error => alert(`Error: ${error}`));
	  }

	 addToFavourites(element) {
	    element.favourite = !element.favourite;
	    Communicators.Put(element)
	    .then((response) => {
	      if (response.ok) {
	        this.takeFavourites();
	      }
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

    moreDetails(flightNumber){
	    Communicators.More(flightNumber)
	    .then( myJson => this.props.onMoreUpdate(myJson))
	    .catch( error => alert(`Error: ${error}`));
	}


	render() {
		const {missionName, flightNumber, launchYear, imageLink, element} = this.props;
		return (
			<div className="card">
				<span>
					<strong>Flight number:</strong><br/> &rarr; {flightNumber} 
				</span>
				<span>
					<strong>Mission name:</strong><br/> &rarr; {missionName} 
				</span>
				<span>
					<strong>Year:</strong><br/> &rarr; {launchYear} 
				</span>
				<img src={imageLink} alt="link"/>
				<Link to="/preview">
					<div className="more" onClick={() => this.moreDetails(flightNumber)}>
						<img src={moreDet} alt="more"/>
					</div>
				</Link>
				<div className="fav" onClick={() => this.addToFavourites(element)}>
					<img src={element.favourite ? fav : favourites} alt="fav"/>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
 return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onFavouritesDataUpdate : (favouritesData, data) => dispatch({type: actionTypes.FAVOURITES_DATA_UPDATE , favouritesData: favouritesData, data: data}),
    onMoreUpdate : more => dispatch({type: actionTypes.MORE_UPDATE , more: more}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);