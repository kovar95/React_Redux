import React, {Component, Fragment} from 'react';
import './Favourites.scss';
import Fav from '../Fav/Fav';
import {Motion, spring} from 'react-motion';

class Favourites extends Component{


	state = {
		showFavourites: false,
	}

	toggleShow() {
		const {showFavourites} = this.state;
		if (showFavourites) {
			this.setState({
				showFavourites: false
			})
		} else {
			this.setState({
				showFavourites: true
			})
		}
		
	}

	render() {
		const {missions} = this.props;
		const {showFavourites} = this.state;

		return (
			<Fragment>
				<h3 className="show-favourites" onClick={() => this.toggleShow()}>{showFavourites? "Hide favourites" : "Show favourites"}</h3>
				<Motion
	                  defaultStyle={{opacity: 0, right : -200}}
	                  style={{
	                  	opacity: spring(showFavourites ? 1 : 0), 
	                  	right: spring(showFavourites ? 62 : -200),
	                  }}
	                >
	                { style => (
						<div 
							className="favourites" 
							style={{
	                     		opacity : style.opacity,
	                     		right: style.right
	                    	}}
	                    >
							<h3>Favourite flights</h3>
							{missions.map( element => <Fav 
														key={element.id}
														uniqueId={element.id}
														flightNumber={element.flight_number}
														launchYear={element.launch_year}
														imageLink={element.links.mission_patch_small}
														missionName={element.mission_name}
														element={element}
													  />
										)
							}
						</div>
					)}
	                  
	                
	            </Motion>
            </Fragment>
		)
	}
}

export {Favourites};
