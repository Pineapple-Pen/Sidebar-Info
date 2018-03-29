import React from 'react';
import axios from 'axios';
import InfoList from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    }; 
  }

  componentDidMount() {
    this.getRestaurantData(this.props.id);
  }

  getRestaurantData (newId) {
    let thisId = newId || 1337;
    axios.get('/api/restaurants/' + thisId + '/sidebar')
      .then((response) => {
        console.log('received:', response);
        this.setState({ restaurant: response.data.result });
      }).catch((err) => {
        console.error('Failed to fetch restaurant data from server:', err);
      });
  }

  render() {
    if (this.state.restaurant) {
      return (
        <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={this.state.restaurant} />
          <MapContainer geometry={this.state.restaurant.geometry} />
        </div>
      );
    } else {
      return (<div> Loading Sidebar... </div>);
      
    }
  }
}

