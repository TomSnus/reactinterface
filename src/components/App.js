import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { last } from 'lodash';

class App extends React.Component{
  constructor () {
    super();
    this.state= {
      myAppointments: [], 
      lastIndex: 0
    }
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
               <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}/>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
  }
}

export default App;
