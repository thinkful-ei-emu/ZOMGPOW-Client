import React from 'react';
import config from '../../config';
import TokenService from '../../Services/token-service';

class DataDisplay extends React.Component {

  state = {
    loading: false,
  }

  componentDidMount(){
    console.log('component data display')
    return fetch(`${config.API_ENDPOINT}/data/1`, {
      method: 'GET',
      headers: {
         'authorization' :`Bearer ${TokenService.getAuthToken()}`
        }
    })
      .then(res => console.log(res.json()))
  }


  render(){
    return (
      <div>Data display</div>
    )
  }

}

export default DataDisplay 