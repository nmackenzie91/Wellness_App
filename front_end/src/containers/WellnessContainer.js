import React, { Component } from "react";
import Header from "../components/Header";
import QuestionList from "../components/QuestionList";
import Results from "../components/Results";
import Greeting from "../components/Greeting";
import Footer from "../components/Footer";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Stats from "../components/Stats";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class WellnessContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            user: [],
            questionList:[],
            selectedResults: [],
            graphTitle: "",
            graphData: [],
            trends: [],
            showGraph: ""
        }
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.handleGraphSelected = this.handleGraphSelected.bind(this);
    }

    // http://localhost:8080

    componentDidMount() {

        // Get all questions
        const questions_url = "http://localhost:8080/questions"
        fetch(questions_url)
        .then(res => res.json())
        .then(data => this.setState({questionList: data}))

        // Get User Data
        const users_url = "http://localhost:8080/users/1"
        fetch(users_url)
        .then(res => res.json())
        .then(data => this.setState({user: data}))

        // Get last week Data
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const todayString = today.toISOString().split('T')[0];
        const lastWeekString = lastWeek.toISOString().split('T')[0];

        const dates = {
            startDate: lastWeekString,
            endDate: todayString
        }

        this.handleDateSubmit(dates);
        
        // Get Trends Data
        const trends_url = "http://localhost:8080/trends/1?dayScore=5"
        fetch(trends_url)
        .then(res => res.json())
        .then(trends_data => this.setState({trends: trends_data}))

    }

    handleAnswerSubmit(submittedAnswers) {
        
        // If it's past 5PM submit for yesterday
        let submission_day = new Date();
        if (submission_day.getHours() >= 17) {
            submission_day.setDate( submission_day.getDate() - 1 )
            // {console.log("its past 5PM, submitting for yesterday")}
        }

        let timestamp = submission_day.toISOString().split('T')[0];

        // POST All Answers
        const requestOptions = {
                
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"userId": 1,
                "dayScore": submittedAnswers.DAY,
                "dayComment": submittedAnswers.dayComment,
                "date": timestamp,
                "answers": [
                    {
                    "question": "SLEEP",
                    "score": submittedAnswers.SLEEP
                    },
                            {
                    "question": "EAT",
                    "score": submittedAnswers.EAT
                    },
                            {
                    "question": "MENTAL",
                    "score": submittedAnswers.MENTAL
                    },
                            {
                    "question": "PHYSICAL",
                    "score": submittedAnswers.PHYSICAL
                    },
                            {
                    "question": "SOCIAL",
                    "score": submittedAnswers.SOCIAL
                
                            }
                ]
            })
        };
        fetch('http://localhost:8080/submissions', requestOptions)
        .then(response => response.json())

    }

    handleDateSubmit(dates){
        const url =`http://localhost:8080/submissions/1?from=${dates.startDate}&to=${dates.endDate}`
        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({selectedResults: data}))
    }

    handleGraphSelected(title, data){
        this.setState({graphData: data});
        this.setState({graphTitle: title});
        if(title === "trending") {
            this.setState({showGraph: "trend"});
        }
        else {
            this.setState({showGraph: "scores"})
        }
    }


  render() {
    return (
            <>
            <Router>
                <>
                    <Header />

                    <Greeting name={this.state.user.name}/>

                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                    path="/submission"
                    render={() => <QuestionList 
                        questionList={this.state.questionList}
                        onAnswerSubmit={this.handleAnswerSubmit} />}
                    />
                    <Route 
                    path="/calendar"
                    render={() => <Results
                        selectedResults={this.state.selectedResults}
                        onDateSubmit={this.handleDateSubmit} 
                         />}
                    />
                    <Route 
                        path="/stats" 
                        render={() => <Stats
                            trends={this.state.trends}
                            showGraph={this.state.showGraph}
                            submissionsData={this.state.selectedResults}
                            graphTitle={this.state.graphTitle}
                            graphData={this.state.graphData}
                            onDateSubmit={this.handleDateSubmit}
                            onGraphSelected={this.handleGraphSelected}/>
                        }
                    />

                    <Route component={ErrorPage}/>
                    </Switch>
                </>
            </Router>

            <Footer />

            </>
        )
    }
}
export default WellnessContainer;
