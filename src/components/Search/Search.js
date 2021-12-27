import React, { useState, useEffect } from 'react';
import './Search.scss';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

const Search = ({ data, onFilteredDataUpdate }) => {
  const [searchedTerm, setSearchedTerm] = useState('');

  useEffect(() => {
    const dataSearch = (text) => {
      const filteredData = data.filter((item) => {
        return item.mission_name
          .toLowerCase()
          .includes(text.toLowerCase().trim());
      });
      onFilteredDataUpdate(filteredData);
    };

    dataSearch(searchedTerm);
  }, [searchedTerm, data, onFilteredDataUpdate]);

  return (
    <section className="search">
      <input
        type="text"
        value={searchedTerm}
        placeholder="Search"
        name="Search"
        onChange={(e) => setSearchedTerm(e.target.value)}
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilteredDataUpdate: (filteredData) =>
      dispatch(actionCreators.updateFilteredData(filteredData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
