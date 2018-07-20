import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Auth from './Auth';

export default class Main extends Component {

  constructor(props){
      super(props); 
  }
   
  render() {
    return (
      <div>
      <Grid container spacing={24}>
        <Grid item xs={8} sm={4} />
        <Grid item xs={8} sm={4}>
          <Auth />
          {/**/}
        </Grid>
        <Grid item xs={8} sm={4} />
      </Grid>
      </div>
    );
  }
}
