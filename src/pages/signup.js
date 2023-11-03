import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import {Field} from 'react-final-form'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '../components/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '../components/TextField';
import { Input } from '@mui/material';
import RFTextField from '../components/RFTextField';
import FormButton from '../components/FormButton';
import FormFeedback from '../components/FormFeedback';

class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: '',
          password: '',
          passwordConfirm: '',
          email: '',
          isSignedUp: false,
        };
      }

      handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
      handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, password, passwordConfirm, email } = this.state;
    
        const signupForm = {
          name,
          password,
          passwordConfirm,
          email,
        };
    
        await axios
          .post('http://localhost:3005/api/v1/users/signup', signupForm)
          .then(res => {
            console.log(res.status)
            if(res.status == 201){
            this.setState({ isSignedUp: true})
          }})
          .catch(err => {
            console.error(err);
          });
      };
    render() {
        if (this.state.isSignedUp) {
            // redirect to home if signed up
            return <Navigate to = {{ pathname: "/login" }} />;
          }
        return (
           <div>
             
             <FormControl
             onSubmit={this.handleSubmit}
           >
                <Box ml={65} pt={10} b={10} > 
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 8 }}>
          Cadastre-se
        </Typography>
                  <Grid wrap="nowrap"
                 sx={{maxHeight: "100%", 
                 verticalAlignment:"center",
                 mx: "auto",
                }}
                 alignItems="center"
                 spacing={0}
                 justifyContent="center"
                 justify="flex-end"
                 >
                 
                  <Input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12} sm={6} spacing={2}>
                   <Input
                      type="text"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                    />
                   </Grid>
                   <br/>
                   <Grid item xs={12} sm={6}>
                   <Input
                      type="text"
                      className="form-control"
                      name="passwordConfirm"
                      placeholder="Password Confirm"
                      onChange={this.handleInputChange}
                    />
                   </Grid>
                   <br/>
                   <Grid item xs={12} sm={6}>
                   <Input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                   </Grid>
                   <br/>
                 
                 <FormButton
                   sx={{ mt: 3, mb: 2 }}
                   color="secondary"
                   type="submit"
                   label="Sign up"         
                 >
                  Sign up
                 </FormButton>
               
                 </Box>
           </FormControl>
           <br/><br/>
           </div>
          );
};
}
export default SignUp;