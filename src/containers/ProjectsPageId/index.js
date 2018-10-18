import React, { Component } from 'react';
import { connect } from 'react-redux'
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'

import TopNav from '../../components/TopNav'
import { loadProjects } from '../../structural/projects/actions'

import './styles.css';
import 'react-fine-uploader/gallery/gallery.css'

const GET_PROJECT = gql`
  {
      project(id: $id) @rest(type: "Project", path: "/projects/{args.id}" ) {
        project @type(name: "Project") {
          name
          description
        }
      }
  }
`

const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: 'scrap-app.s3-website-ap-southeast-2.amazonaws.com',
      accessKey: 'AKIAJYA6XGDJT3BMIXFA'
    },
    signature: {
      endpoint: 'http://localhost:3000',
      // version: 4
    },
    // chunking: {
    //   enabled: true
    // },
    // objectProperties: {
    //   region: 'ap-southeast-2'
    // }
  }

})

class ProjectsPageId extends Component {
  constructor(props) {
    super(props)

    this._renderProjectDetails = this._renderProjectDetails.bind(this)

  }


  _renderProjectDetails = () => (
    <Query query={GET_PROJECT} variables={{ id: this.props.match.params.id }}>
      {({data: { project }, loading}) => {
        if (loading) {
          return (
            <div>Loading</div>
          )
        } else {
          return (
              <div>
                <p>{project.project._id}</p>
                <p>{project.project.name}</p>
                <p>{project.project.description}</p>
              </div>

          )
        }
      }}
    </Query>
  )

  render() {
    return (
      <div className={'project__id'}>
        <TopNav />
        {this._renderProjectDetails()}
        <Gallery className={'project__gallery'} uploader={uploader} />
      </div>

      
    )
  }
}

export default ProjectsPageId

