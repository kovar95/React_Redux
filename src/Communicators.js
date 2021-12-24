class Communicators {
  static baseURL = 'https://spacex-74dbe.firebaseio.com/spacex';

  static Fetch = async () => {
    return await fetch(`${Communicators.baseURL}.json`).then((response) =>
      response.json()
    );
  };

  static Put = async (element) => {
    return await fetch(`${Communicators.baseURL}/${element.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(element),
    });
  };

  static More = async (flightNumber) => {
    return await fetch(
      `https://api.spacexdata.com/v3/launches/${flightNumber}.json`
    ).then((response) => response.json());
  };
}

export { Communicators };
