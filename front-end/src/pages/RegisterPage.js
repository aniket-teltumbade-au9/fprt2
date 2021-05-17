import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/LogReg.css'
import { register } from '../redux/actions/authActions'


class RegisterPage extends Component {
    state={
        name:null,
        email:null,
        password:null
    }
    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.register(this.state)
    }
    render() {
        return (
            <div className="container right-panel-active" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Create Account</h1>

                        <input type="text" placeholder="User Name" name="username"  onChange={this.handleInput}/>
                        <input type="email" placeholder="Email" name="email" onChange={this.handleInput}/>
                        <input type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to="/login" className="ghost" id="signUp" className="ghost" id="signIn">Sign In</Link>
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}



export default connect(null, {register})(RegisterPage)
