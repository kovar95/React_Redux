import React from 'react';
import './Preview.scss';
import { Link } from 'react-router-dom';

const Preview = ({
  flightNumber,
  launchYear,
  missionName,
  moreDetails,
  launchSuccess,
  nationality,
  flightPic,
  missionSimbol,
}) => (
  <div className="show">
    <section className="preview">
      <p>Mission Preview</p>

      <span className="first">
        <strong>Mission name:</strong> {missionName}
      </span>
      <span>
        <strong>Flight number:</strong> {flightNumber}
      </span>
      <span>
        <strong>Launch Year:</strong> {launchYear}
      </span>
      <span>
        <strong>Nationality:</strong> {nationality}
      </span>
      <span>
        <strong>Launch success:</strong>{' '}
        {launchSuccess ? 'Successful' : 'Failed'}
      </span>

      <span>
        <strong>Photos:</strong>
      </span>

      <div className="pics">
        {flightPic.map((pic) => {
          return (
            <a href={pic} target="_blank" key={pic} rel="noopener noreferrer">
              <img src={pic} alt="flightPic" />
            </a>
          );
        })}
      </div>

      <span>
        <strong>Details:</strong> {moreDetails}
      </span>

      <img src={missionSimbol} alt="missionSimbol" />
      <Link to="/">
        <button>X</button>
      </Link>
    </section>
  </div>
);

export default Preview;
