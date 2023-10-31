import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom"
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
    
      handleSubmit = e => {
        e.preventDefault();
    
        const { name, password, passwordConfirm, email } = this.state;
    
        const signupForm = {
          name,
          password,
          passwordConfirm,
          email,
        };
    
        axios
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
            <div style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}       >
              <br />
              <div className="container">
                <h1> SIGN UP</h1>
                <form onSubmit={this.handleSubmit}>
                  <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="passwordConfirm"
                      placeholder="Password Confirm"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <div style={{ width: '30%' }}>
                    <button className="btn btn-success" type="submit">
                      Create
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
          );
};
}
export default SignUp;