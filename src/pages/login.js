import React, { Component} from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '../components/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '../components/TextField';
import FormButton from '../components/FormButton';

class Login extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        password: '',
        email: '',
        isLoggedIn: false,
        showPassword: false
      };
    }
  
  
  
    
    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  
    handleSubmit = async(e) => {
      e.preventDefault();

      const { password, email } = this.state;

      const loginForm = {
        password,
        email,
      };
     await axios
        .post('http://localhost:3005/api/v1/users/login', loginForm)
        .then(res=> {


          if(res.status === 200){

            axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

          localStorage.setItem('token', res.data.token);
            
          this.setState({ isLoggedIn: true})
        }})
        .catch(err => {
          alert("Senha ou usuário inválido");
          

        });
    };
  render() {

      if (this.state.isLoggedIn) {
        console.log("YOU ARE HERE")
          return <Navigate to = {{ pathname: "/events" }} />;
        }
      return (
            <div>
            <br />
            <FormControl
             onSubmit={this.handleSubmit}
           >
            <Box ml={65} pt={10} b={10} > 
                <Typography variant="h4" component="h2" sx={{ mb: 8, align:"center" }}>Login</Typography>
                  <Grid item xs={12} sm={6}>
                   <TextField
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                   </Grid>
                   <br/>
                  <Grid item xs={12} sm={6} spacing={2}>
                   <TextField
                   
                   type={'password'}
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                     
                    />
                   </Grid>
                   <FormButton
                   sx={{ mt: 3, mb: 2 }}
                   color="secondary"
                   type="submit"
                   label="Login" 
                   onClick={this.handleSubmit}        
                 >
                  Login
                 </FormButton>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
            </Box>
            </FormControl>
            </div>
        );
};
}
export default Login;