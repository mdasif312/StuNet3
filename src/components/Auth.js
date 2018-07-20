import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './Auth.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './Login';
import Signup from './Signup'; 
 
export default   class Auth extends Component {


  constructor(props){
      super(props);
      this.state = {
        tab_value : 0
      }
  }
  
  handleChange = (event, value) => {
    this.setState({ 
        tab_value : value
     });
  };
  render() {

    return (
      <div class="authroot">
        <br />
            <h1 style={{color:'white'}}>StuNet</h1> {/*Stunet*/}
            <br />
        <Card className="auth_card">
            <Tabs
            value={this.state.tab_value}
            onChange={this.handleChange}
            centered
            >
            <Tab
                disableRipple
                label = { <span style={{ color: 'black' }}>Login</span> }
             />
            <Tab
                disableRipple 
                label={ <span style={{ color: 'black' }}>Signup</span> }
             />
            </Tabs> 
            {this.state.tab_value == 0 ? <Login /> : <Signup />}
        </Card>

        <br />
        <br />
        <span>Made with JavaScript and ❤️ </span>
      </div>
    );
  }
} 