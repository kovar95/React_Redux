const sortFlights = (a, b) => {
  const nameA = a.mission_name.toLowerCase();
  const nameB = b.mission_name.toLowerCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }

  return comparison;
};

export const sortData = (unsortedData) => {
  const copyOfArray = [...unsortedData];
  copyOfArray.sort(sortFlights);

  return copyOfArray;
};
