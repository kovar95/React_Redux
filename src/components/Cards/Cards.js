import React from 'react';
import './Cards.scss';
import Card from '../Card/Card';

const Cards = ({ missions }) => (
  <div className="cards">
    {missions.map((mission) => {
      const {
        id,
        flight_number,
        launch_year,
        mission_name,
        links: { mission_patch_small },
      } = mission;
      return (
        <Card
          key={id}
          uniqueId={id}
          flightNumber={flight_number}
          launchYear={launch_year}
          imageLink={mission_patch_small}
          missionName={mission_name}
          element={mission}
        />
      );
    })}
  </div>
);

export default Cards;
