import React, { Component } from 'react';
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import TopNav from '../../components/TopNav'

import './styles.css';

const LOGIN_MUTATION = gql`
  mutation login ($email: String!, $password: String!) {
    login (input: {email: $email, password: $password})
      @rest(type: "User", path: "/users/login", method: "POST" ) {
        token
    }
  }
`

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup (input:{ name: $name, email: $email, password: $password})
      @rest(type: "User", path: "/users/signup", method: "POST" ) {
        user @type(name: "User") {
          name
        }
      }
  }
`

class Home extends Component {

  constructor(props) {
    
    super(props)

    this._renderLoginOrSignup = this._renderLoginOrSignup.bind(this)
    this._confirm = this._confirm.bind(this)
    this._saveUserData = this._saveUserData.bind(this)

    this.state = {
      login: true,
      email: '',
      password: '',
      name: ''
    }
  }

  _saveUserData = token => {
    localStorage.setItem('Access Token', token)
  }

  _renderLoginOrSignup () {
    const { login, email, password, name } = this.state
    return (
      <div className='login'>
        <h3>{ login ? 'Login' : 'Sign up' }</h3>
        {!login && (
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="Choose a password"
        />

        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => {
            console.log('data: ', data);
            this._confirm(data)}
          }>
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation> 
        
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'Sign up'
              : 'Log in'}
          </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push('/projects')
  }

  render() {
    return (
      <div className="App">
        <TopNav />
        {this._renderLoginOrSignup()}
      </div>
    );
  }
}

export default Home;
