import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { last, without } from 'lodash';

class App extends React.Component{
  constructor () {
    super();
    this.state= {
      myAppointments: [], 
      formDisplay: false,
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);

  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);

    console.log(apt)
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({
      myAppointments: tempApts
    })
  }

  componentDidMount () {
    fetch('./data.json').then(response => response.json())
    .then(result => {
      const apts = result.map(item => {
        item.aptId = this.state.lastIndex;
        this.setState({lastIndex: this.state.lastIndex+1})
        return item;
      })
      this.setState({
        myAppointments: apts
      })
    })
  }
  render() {
  return (
    <main class="page bg-white" id="petratings">
        <div className="container">
          <div class="row">
            <div class="col-md-12 bg-white">
              <div class="container">               
               <AddAppointments 
               addAppointment = {this.addAppointment}
               toggleForm = {this.toggleForm}
                formDisplay = {this.state.formDisplay}/>
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}
                deleteAppointment = {this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
  );
  }
}

export default App;
