import React from 'react';
import './Favourites.scss';
import Card from '../Card/Card';
import { Motion, spring } from 'react-motion';

const Favourites = ({ missions, showFavourites, setShowFavourites }) => {

  return (
    <>
      <h3
        className="show-favourites"
        onClick={() => setShowFavourites(!showFavourites)}
      >
        {`${showFavourites ? 'Hide' : 'Show'} favourites`}
      </h3>
      <Motion
        defaultStyle={{ opacity: 0, right: -200 }}
        style={{
          opacity: spring(showFavourites ? 1 : 0),
          right: spring(showFavourites ? 62 : -200),
        }}
      >
        {(style) => (
          <div
            className="favourites"
            style={{
              opacity: style.opacity,
              right: style.right,
            }}
          >
            <h3>Favourite flights</h3>
            {missions.map((element) => {
              const {
                id,
                flight_number,
                launch_year,
                mission_name,
                links: { mission_patch_small },
              } = element;
              return (
                <Card
                  key={id}
                  uniqueId={id}
                  flightNumber={flight_number}
                  launchYear={launch_year}
                  imageLink={mission_patch_small}
                  missionName={mission_name}
                  element={element}
                  isFavouritesSection={true}
                />
              );
            })}
          </div>
        )}
      </Motion>
    </>
  );
};

export default Favourites;
