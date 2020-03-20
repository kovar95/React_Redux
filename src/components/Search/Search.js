import React, {Component} from 'react';
import './Search.scss';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/ActionTypes';


class Search extends Component {

	state = {
		searchedTerm : '',
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.searchedTerm !== this.state.searchedTerm) {
			return true
		}
		return false
	}

	componentDidUpdate(){
		const {searchedTerm} = this.state;
		this.dataSearch(searchedTerm);
	}

	dataSearch(text) {
	    const filteredData = this.props.data.filter( item => {
	      return item.mission_name.toLowerCase().includes(text.toLowerCase().trim())
	    })
	    this.props.onFilteredDataUpdate(filteredData);
	  }

	addValue(event) {
		this.setState({
			searchedTerm : event.target.value,
		})
	}

	render() {
		const {searchedTerm} = this.state;
		return(
			<section  className="search" >
				<input type="text" 
					   value={searchedTerm}
					   placeholder="Search" 
					   name="Search" 
					   onChange={ e => this.addValue(e)} 
				/>
			</section>
		)
	}
}

const mapStateToProps = state => {
  return {
    data : state.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilteredDataUpdate : filteredData => dispatch({type: actionTypes.FILTER_DATA_UPDATE , filteredData: filteredData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);