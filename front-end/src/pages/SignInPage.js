import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/LogReg.css'
import { login } from '../redux/actions/authActions'

class SignInPage extends Component {
    state={
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
        
        this.props.login(this.state)
    }
    render() {
        return (
            <div className="container left-panel-active" id="container">
                <div className="form-container sign-in-container">
                <form onSubmit={this.handleSubmit}>
                        <h1>Sign in</h1>

                        <input type="email" placeholder="Email" name="email" onChange={this.handleInput} />
                        <input type="password" placeholder="Password" name="password" onChange={this.handleInput} />
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/" className="ghost" id="signUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



export default connect(null, {login})(SignInPage)
