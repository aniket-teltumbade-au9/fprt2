import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import { isAuthenticated, logout } from './redux/actions/authActions';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PublicGalleryPage from './pages/PublicGalleryPage';
import PrivateGalleryPage from './pages/PrivateGalleryPage';
import AddPhotoPage from './pages/AddPhotoPage';
import SinglePhotoPage from './pages/SinglePhotoPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';

class App extends Component {
  componentDidMount = () => {
    this.props.isAuthenticated()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authDetails.isAuth !== this.props.authDetails.isAuth) {
      this.props.isAuthenticated()
    }
  }
  Logout = () => {
    this.props.logout()
  }
  render() {
    return (
      <>
        {
          this.props.authDetails ? (

            <BrowserRouter>
              {

                this.props.authDetails.isAuth === true ? (
                  <>
                    <Navbar
                      userData={this.props.authDetails.userProfile}
                      handleLogout={this.Logout} />

                    <Switch>
                      <Route exact path='/' component={PublicGalleryPage} />
                      <Route exact path='/my' component={PrivateGalleryPage} />
                      <Route exact path='/new' component={AddPhotoPage} />
                      <Route exact path='/single/:id' component={SinglePhotoPage} />
                    </Switch>
                  </>
                ) :

                  this.props.authDetails.isAuth === false ? (

                    <Switch>
                      <Route path="/login" component={SignInPage} />
                      <Route path="/" component={RegisterPage} />
                    </Switch>
                  ) : (
                    <h1>Loading...</h1>
                  )


              }
            </BrowserRouter >) : (
            <h1>Loading...</h1>)}
      </>

    )
  }
}

const mapStateToProps = (storeState) => {
  return { authDetails: storeState.authState }
}

export default connect(mapStateToProps, { isAuthenticated, logout })(App)