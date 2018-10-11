import React, { Component } from 'react';
import { connect } from 'react-redux'
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { loadProjects } from '../../structural/projects/actions'

import './styles.css';

const GET_PROJECTS = gql`
  {
      projects @rest(type: "Projects", path: "/projects") {
          _id
          name
          description
      }
  }
`

class ProjectsPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
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
                    <p>{project.name}</p>
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
}

export default ProjectsPage

