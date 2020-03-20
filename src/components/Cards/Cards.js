import React, {Component} from 'react';
import './Cards.scss';
import Card from '../Card/Card';

class Cards extends Component{

	render() {
		const {missions} = this.props;
		return (
			<div className="cards">
			{missions.map( element => <Card 
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
		)
	}
}

export {Cards};