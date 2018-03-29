import React from 'react';
import _ from 'underscore';
import OpeningHours from './OpeningHours.jsx';

var InfoListElement = (props) => {
  if (!props.info.text) {
    return <div></div>;
  } else {
    return (
      <div className="sidebar-flexbox-row sidebar-info-list-element">
        <div className="sidebar-info-list-element-icon">
          <i className={props.info.icon} />
        </div>
        <div className="sidebar-info-list-text">
          <a className="sidebar-anchor" href={props.info.link.url}
            target={props.info.link.newTab ? '_blank' : ''}>
            {props.info.text}
          </a>
        </div>
      </div>
    );
  }
};

export default InfoListElement;