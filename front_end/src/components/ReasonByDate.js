import React, {Component} from 'react';

class ReasonByDate extends Component {

//startDate might have to be null?

    constructor(props){
        super(props);
        this.state={
            startDate: '',
            endDate: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        if (!startDate || !endDate){
            return
        }

        this.props.onDateSubmit({
            startDate: startDate,
            endDate: endDate
        })

        this.setState({
            startDate: '',
            endDate: ''
        })
    }


    handleEndDateChange(event){
        this.setState({
            endDate: event.target.value
        })
    }

    handleStartDateChange(event){
        this.setState({
            startDate: event.target.value
        })
    }

    render(){
        return(
            <>
            <div>
                <h1><b>Select a date</b></h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="sdate">Start Date</label>
                <input className="control"
                type="date"
                name="sdate"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}/>


                <label htmlFor="edate">End Date</label>
                <input className="control"
                type="date"
                name="edate"
                value={this.state.endDate}
                onChange={this.handleEndDateChange}/>

                <input className="button is-info is-inverted" 
                type="submit"
                value="Get"/>
            </form>
            
            </div>
            </>
        )
    }
}

export default ReasonByDate;