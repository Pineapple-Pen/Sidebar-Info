import React from 'react';
import _ from 'underscore';

var Periods = (props) => {
  var periodDivs = _.map(props.weekdayText, (period, index) => {
    var weekday = period.split(': ')[0];
    var time1;
    var time2;
    if (period.includes(', ')) {
      time1 = period.split(': ')[1].split(', ')[0];
      time2 = period.split(': ')[1].split(', ')[1];
    } else {
      time1 = period.split(': ')[1];
      time2 = null;
    }

    var periodObj = {
      weekday: weekday,
      time1: time1,
      time2: time2
    };

    var weekdayNum = new Date(Date.now()).getDay() - 1;
    if (weekdayNum === -1) {
      weekdayNum = 6;
    }

    return (
      <div key={index} className="sidebar-flexbox-col sidebar-periods-element"
        style={{'fontWeight': weekdayNum === index ? 'bold' : 'normal'}} >
        <div className="sidebar-flexbox-row sidebar-periods-element-info">
          <div className="sidebar-periods-element-day" >{periodObj.weekday}</div>
          <div className="sidebar-periods-element-time">{periodObj.time1}</div>
        </div>
        <div className="sidebar-periods-element-info-additional">
          <div className="sidebar-periods-element-time">{periodObj.time2}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="sidebar-flexbox-col sidebar-periods">
      {periodDivs}
    </div>
  );
};

export default Periods;

