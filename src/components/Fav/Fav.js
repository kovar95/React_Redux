import React, {Component} from 'react';
import './Fav.scss';
import moreDet from '../../images/info.png';
import {Link} from 'react-router-dom';
import {Communicators} from '../../Communicators';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/ActionTypes';

class Fav extends Component{

    moreDetails(flightNumber){
	    Communicators.More(flightNumber)
	    .then( myJson => this.props.onMoreUpdate(myJson))
	    .catch( error => alert(`Error: ${error}`));
	}

	render() {
		const {missionName, flightNumber, launchYear, imageLink} = this.props;
		return (
			<div className="favy">
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
						<img src={moreDet} alt="more" />
					</div>
				</Link>
			</div>
		)
	}
}

const mapStateToProps = state => {
 return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onMoreUpdate : more => dispatch({type: actionTypes.MORE_UPDATE , more: more})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fav);