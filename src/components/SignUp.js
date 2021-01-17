import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Grid, TextField, Button } from '@material-ui/core';
import { AccountCircle as User, VpnKey as Password } from '@material-ui/icons';

const SignUp = () => {
  const SIGN_IN_ENDPOINT = 'http://localhost:3001/auth';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const body = { email: email, password: password, password_confirmation: password };

  async function sendCredentials(url = SIGN_IN_ENDPOINT, data = body) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      history.push('/sign_in');
    }
  }

  return (
    <div>
      <div style={{margin: '5rem 43%'}}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <User />
          </Grid>
          <Grid item>
            <TextField id="email_field" label="Email" type="text" onChange={handleEmail}/>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Password />
          </Grid>
          <Grid item>
            <TextField id="password_field" label="Password" type="password" onChange={handlePassword} />
          </Grid>
        </Grid>
      </div>
      <div style={{margin: '2rem 43%'}}>
        <Button variant="contained" color="primary" onClick={() => sendCredentials()}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default SignUp;