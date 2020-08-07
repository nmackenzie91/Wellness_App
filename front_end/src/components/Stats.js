import React from "react";
import ReasonByDate from "./ReasonByDate";
import { Chart } from "react-google-charts";
import DayModal from "./DayModal";

const Stats = (props) => {

  const stats = {
    dates: [],
    day: {
      scores: [],
      good: [],
      bad: []
    },
    sleep: {
      scores: [],
      good: [],
      bad: []
    },
    eat: {
      scores: [],
      good: [],
      bad: []
    },
    mental: {
      scores: [],
      good: [],
      bad: []
    },
    social: {
      scores: [],
      good: [],
      bad: []
    },
    physical: {
      scores: [],
      good: [],
      bad: []
    }
  }
  let answers = [];

  //
  const commentData = [['Comment', 'Occurrences']];

  for (const [key, value] of Object.entries(props.trends)) { 
    for (const [key2, value2] of Object.entries(value)) {
      let arr = [key2, parseInt(value2)]
      commentData.push(arr);
    }
  }
  //

  let graphData = props.graphData;
  let graphTitle = props.graphTitle;

  const offset = 3.5;

  for(let i = 0 ; i < props.submissionsData.length ; i++ ) {
    stats.dates.push(new Date(props.submissionsData[i].date));

    stats.day.scores.push(props.submissionsData[i].dayScore - offset);
    if( props.submissionsData[i].dayScore - offset >= 0 ){
      stats.day.good.push(props.submissionsData[i].dayScore - offset);
      stats.day.bad.push(0);
    }
    if( props.submissionsData[i].dayScore - offset < 0 ){
      stats.day.good.push(0);
      stats.day.bad.push(props.submissionsData[i].dayScore - offset);
    }

    stats.sleep.scores.push(props.submissionsData[i].answers[0].score - offset);
    if( props.submissionsData[i].answers[0].score - offset >= 0 ){
      stats.sleep.good.push(props.submissionsData[i].answers[0].score - offset);
      stats.sleep.bad.push(0);
    }
    if( props.submissionsData[i].answers[0].score - offset < 0 ){
      stats.sleep.good.push(0);
      stats.sleep.bad.push(props.submissionsData[i].answers[0].score - offset);
    }

    stats.eat.scores.push(props.submissionsData[i].answers[1].score - offset);
    if( props.submissionsData[i].answers[1].score - offset >= 0 ){
      stats.eat.good.push(props.submissionsData[i].answers[1].score - offset);
      stats.eat.bad.push(0);
    }
    if( props.submissionsData[i].answers[1].score - offset < 0 ){
      stats.eat.good.push(0);
      stats.eat.bad.push(props.submissionsData[i].answers[1].score - offset);
    }

    stats.mental.scores.push(props.submissionsData[i].answers[2].score - offset);
    if( props.submissionsData[i].answers[2].score - offset >= 0 ){
      stats.mental.good.push(props.submissionsData[i].answers[2].score - offset);
      stats.mental.bad.push(0);
    }
    if( props.submissionsData[i].answers[2].score - offset < 0 ){
      stats.mental.good.push(0);
      stats.mental.bad.push(props.submissionsData[i].answers[2].score - offset);
    }

    stats.social.scores.push(props.submissionsData[i].answers[3].score - offset);
    if( props.submissionsData[i].answers[3].score - offset >= 0 ){
      stats.social.good.push(props.submissionsData[i].answers[3].score - offset);
      stats.social.bad.push(0);
    }
    if( props.submissionsData[i].answers[3].score - offset < 0 ){
      stats.social.good.push(0);
      stats.social.bad.push(props.submissionsData[i].answers[3].score - offset);
    }

    stats.physical.scores.push(props.submissionsData[i].answers[4].score - offset);
    if( props.submissionsData[i].answers[4].score - offset >= 0 ){
      stats.physical.good.push(props.submissionsData[i].answers[4].score - offset);
      stats.physical.bad.push(0);
    }
    if( props.submissionsData[i].answers[4].score - offset < 0 ){
      stats.physical.good.push(0);
      stats.physical.bad.push(props.submissionsData[i].answers[4].score - offset);
    }
  }

  const dayData = [["Date", "Good Day", "Bad Day"]];
  const sleepData = [["Date", "Good Sleep", "Bad Sleep"]];
  const eatData = [["Date", "Good Food", "Bad Food"]];
  const mentalData = [["Date", "Good Mental", "Bad Mental"]];
  const socialData = [["Date", "Good Social", "Bad Social"]];
  const physicalData = [["Date", "Good Physical", "Bad Physical"]];

  for(let i = 0 ; i < stats.dates.length ; i++ ) {
    dayData.push([stats.dates[i], stats.day.good[i], stats.day.bad[i]]);
    sleepData.push([stats.dates[i], stats.sleep.good[i], stats.sleep.bad[i]]);
    eatData.push([stats.dates[i], stats.eat.good[i], stats.eat.bad[i]]);
    mentalData.push([stats.dates[i], stats.mental.good[i], stats.mental.bad[i]]);
    socialData.push([stats.dates[i], stats.social.good[i], stats.social.bad[i]]);
    physicalData.push([stats.dates[i], stats.physical.good[i], stats.physical.bad[i]]);
  }

  function handleSelect(event) {
    const graphName = event.target.value;
    let data = [];
    let title = "";

    if( graphName === "dayScore" ) {
      data = dayData;
      title = "Well-being by day";
    }
    if( graphName === "sleepScore" ) {
      data = sleepData;
      title = "Sleeping by day";
    }
    if( graphName === "eatScore" ) {
      data = eatData;
      title = "Eating by day";
    }
    if( graphName === "mentalScore" ) {
      data = mentalData;
      title = "Mental by day";
    }
    if( graphName === "socialScore" ) {
      data = socialData;
      title = "Socializing by day";
    }
    if( graphName === "physicalScore" ) {
      data = physicalData;
      title = "Physical by day";
    }
    if( graphName === "trending" ) {
      data = null;
      title = "trending";
    }
    props.onGraphSelected(title, data);
  }

  if(graphTitle === ""){
    graphData = dayData;
    graphTitle = "Well-being by day";
  }

  // const handleOnClick = [
  //   {
  //     eventName: 'select',
  //     callback: ({ chartWrapper }) => {
  //       const chart = chartWrapper.getChart()
  //       const selection = chart.getSelection()
  //       if (selection.length === 1) {
  //         const [selectedItem] = selection
  //         const { row, column } = selectedItem
  //         const date = graphData[row + 1][0]
  //         const submission = props.submissionsData.find(submission =>  submission.date === date.toISOString().split('T')[0] )
  //         answers = submission.answers;
  //       }
  //     }
  //   }
  // ]

  function renderGraph() {
    if(props.showGraph === "trend"){
      return <Chart
      className="graph"
      chartType="BarChart"
      data={commentData}
      width="100%"
      height="400px"
      options={{
        title: 'Trends on Good Days',
        chartArea: { width: '40%' },
        colors: ['#b0120a'],
        legend: { position: 'none' }}}/>
    }
    // if(props.shwGraph === "modal"){

    // }
    else {
      return <Chart
      className="graph"
      chartType="SteppedAreaChart"
      data={graphData}
      options={{
        title: graphTitle,
        vAxis: {
          'minValue': -2.5, 
          'maxValue': 2.5
        }
      }}
      width="100%"
      height="400px"
      legendToggle
      // chartEvents={handleOnClick}
      />
    }
  }

  return (
    <>
      <ReasonByDate
        onDateSubmit={props.onDateSubmit}
      />
      <label htmlFor="graphs">Select Graphs: </label>

      <select name="graphs" id="select-graphs" onChange={handleSelect}>
        <option value="dayScore" defaultValue >Day score</option>
        <option value="sleepScore">Sleeping score</option>
        <option value="eatScore">Eating score</option>
        <option value="mentalScore">Mental score</option>
        <option value="socialScore">Social score</option>
        <option value="physicalScore">Physical score</option>
        <option value="trending">Trending</option>
      </select>

      <div className="stats">
        {renderGraph()}
      </div>
      {/* <DayModal selectedDay={answers} /> */}
    </>
  )

}
export default Stats; 