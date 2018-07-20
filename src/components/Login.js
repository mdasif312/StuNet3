import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class Login extends Component {

  constructor(props){
      super(props); 
  }
  nextClicked(){
    
  }
   
  render() {
    return (
      <div style={{marginTop:'20px', marginBottom:'20px'}}>
        <TextField
          style={{width:'75%'}}

            
          id="name"
          margin="normal"
          placeholder="Roll Number"
        />
        <TextField
          style={{width:'75%'}}
          id="name"
          margin="normal"
          placeholder="Password"
          type="password"
        />
        <br />
        <br />
        <Button
          color="primary"  
          variant ="contained"
          style={{width:'75%'}}
          onClick = {()=>{this.nextClicked();}}
          >
          <span style={{color:'white'}} >Next </span>
        </Button>

      </div>
    );
  }
}