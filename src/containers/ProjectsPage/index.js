import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';

import TopNav from '../../components/TopNav'
import { loadProjects } from '../../structural/projects/actions'

import './styles.css';

const cache = new InMemoryCache()

const GET_PROJECTS = gql`
  {
      projects @rest(type: "Projects", path: "/projects") {
          _id
          name
          description
      }
  }
`

const GET_CURRENT_USER_ID = gql`
  query {
    currentUserId @client
  }
`

const ADD_PROJECT_MUTATION = gql`
  mutation addProject ($name: String!, $description: String!, $id: String!) {
    addProject (input: {email: $email, password: $password, id: $id})
      @rest(type: "Project", path: "/projects", method: "POST" ) {
        project @type(name: "Project") {
          name
          description
        }
    }
  }
`

class ProjectsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: ''
    }

    this._renderProjects = this._renderProjects.bind(this)
    this._renderAddProject = this._renderAddProject.bind(this)
  }

  _renderAddProject () {
    const { name, description } = this.state
    // const { currentUserId } = cache.readQuery({
    //   query: GET_CURRENT_USER_ID
    // })
    const currentUserId = 'userId'
    return (
      <div className='addProject__wrapper'>
        <input
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          type="text"
          placeholder="Project name"
        />
        <input
          value={description}
          onChange={e => this.setState({ description: e.target.value })}
          type="text"
          placeholder="Project description"
        />
        <Mutation
          mutation={ADD_PROJECT_MUTATION}
          variables={{ name, description, currentUserId }}
          onCompleted={data => {
            console.log('data: ', data);
          }}>
          {addProject => (
            <button className='button' onClick={addProject}>
              Add project
            </button>
          )}
        </Mutation>
      </div>
    )
  }

  _renderProjects () {
    return (
      <Query query={GET_PROJECTS}>
        {({data: { projects }, loading}) => {
          if (loading) {
            return (
              <div>Loading</div>
            )
          } else {
            return (
              <ul>
                {projects.map(project => (
                  <li key={project._id}>
                    <p>{project._id}</p>
                    <Link to={`/projects/${project._id}`}>
                      <p>{project.name}</p>
                    </Link>
                    <p>{project.description}</p>
                  </li>
                ))}
              </ul>
            )
          }
        }}
      </Query>
    )
  }

  render() {
    return (
      <div className='projects__wrapper'>
        <TopNav />
        {this._renderAddProject()}
        {this._renderProjects()}
      </div>
            
    )
  }
}

export default ProjectsPage

