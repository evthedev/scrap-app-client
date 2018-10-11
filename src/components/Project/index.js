import React, { Component } from 'react';
// import { connect } from 'react-redux'

// import './styles.css';

class Project extends Component {
  constructor(props) {
    super(props)

    // this._renderProjects = this._renderProjects.bind(this)
  }

  // _renderProjects () {
  //   const projects = this.props.projects
  //   if (projects) {
  //     return (
  //       projects.forEach((project) => <Project className='project__item' project={project} />)
  //     )
  //   }
  // }

  render() {
    return (
      <div className='project__item'>
        Helo
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

// export default connect(mapStateToProps, mapDispatchToProps)(Project);
export default Project
