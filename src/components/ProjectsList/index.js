import React, { Component } from 'react';
// import { connect } from 'react-redux'

// import './styles.css';

import Project from '../Project'

class ProjectsList extends Component {
  constructor(props) {
    super(props)

    this._renderProjects = this._renderProjects.bind(this)
  }

  _renderProjects () {
    const projects = this.props.projects
    if (projects) {
      return (
        projects.forEach((project) => <Project project={project} />)
      )
    }
  }

  render() {
    return (
      <div>
        { this._renderProjects() }
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   loading: state.loading
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: {
//       loadImages: () => dispatch(loadImages())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
export default ProjectsList
