import React from 'react';
import _ from 'underscore';
import OpeningHours from './OpeningHours';
import InfoListElement from './InfoListElement';

var InfoList = (props) => {
  var info = {
    openingHours: {
      data: props.restaurant.opening_hours,
      icon: 'fas fa-clock fa-lg',
      link: {url: null, newTab: false}
    },
    address: {
      text: props.restaurant.formatted_address,
      icon: 'fas fa-map-marker-alt fa-lg',
      link: {url: null, newTab: false}
    },
    phone: {
      text: props.restaurant.international_phone_number,
      icon: 'fas fa-phone fa-lg',
      link: {url: 'tel:' + props.restaurant.international_phone_number, newTab: false}
    },
    website: {
      text: (new URL(props.restaurant.website)).hostname,
      icon: 'fas fa-globe fa-lg',
      link: {url: props.restaurant.website, newTab: true}
    },
    directions: {
      text: 'Get Directions',
      icon: 'fas fa-compass fa-lg',
      link: {url: props.restaurant.url, newTab: true}
    }
  };

  return (
    <div className="sidebar-flexbox-col sidebar-info-list">
      <OpeningHours info={info.openingHours} />
      <InfoListElement info={info.address} />
      <InfoListElement info={info.phone} />
      <InfoListElement info={info.website} />
      <InfoListElement info={info.directions} />
    </div>
  );
};


export default InfoList;
