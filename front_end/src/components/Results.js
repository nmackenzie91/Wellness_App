import React from "react";
import ReasonByDate from './ReasonByDate';
import DayModal from './DayModal';

const Results = (props) => {

  const results = props.selectedResults.map(result => {
    
    let dt = new Date(result.date);

    // Get days of the week
    switch (dt.getDay()){
      case 0:
        var day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        day = "Sunday";
        break;  
    }

    //colours for each day score number
    switch (result.dayScore){
      case 1:
      var day_style = "one"; 
      break;
      case 2:
      day_style = "two"; 
      break;
      case 3:
      day_style = "three"; 
      break;
      case 4:
      day_style = "four"; 
      break;
      case 5:
      day_style = "five"; 
      break;
      case 6:
      day_style = "six"; 
      break;
      default:
      day_style = "one";
      break;  
    }

    return (<div className="panel" className={day_style} key={result.id} id={result.id}>
      <p>{day} {dt.getDate()}</p>
      <p>"<i>{result.dayComment}</i>"</p>
      
      <p className={day_style}>Rating: {result.dayScore}</p>
      <DayModal
      selectedDay={result.answers} 
      />
    </div>
    )  
  })

  const reversedResults = results.reverse();

    return(
        <>
        <ReasonByDate
          onDateSubmit={props.onDateSubmit}
        />
        <div className="wrapper">
          {reversedResults}
        </div>
        </>
    )
}

export default Results;

