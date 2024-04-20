import React from 'react';
import { filter, includes, orderBy as funcOrderBy, remove, reject } from 'lodash';
import { taskData } from '../mocks/task'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: taskData,
      searchTasks: taskData,
      task: {}
    }
  }

  onChange = (e) => {
    let data = this.state.searchTasks.filter(item => item.title.indexOf(e.target.value) > -1 || item.description.indexOf(e.target.value) > -1);
    console.log(data)
    if (!e.target.value) {
      this.setState({
        searchTasks: this.state.tasks
      })
    } else {
      this.setState({
        searchTasks: data
      })
    }

  }

  showDetail = (item) => {
    this.setState({ task: item })
  }

  renderItem = () => {
    const elmItem = this.state.searchTasks.map((item, index) => {
      return (
        <tr className={item.complete === 1 ? "line-click" : ""}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" onClick={() => this.showDetail(item)}>View</button>
          </td>
        </tr>
      )
    });
    return elmItem
  }

  renderDetail() {
    return (
      <div>
        <div>Detail</div>
        <div>Title: {this.state.task.title}</div>
        <div>Description: <span>{this.state.task.description}</span></div>
        <div>Status: <span style={{ color: this.state.task.status ? 'green' : 'red' }}>
          {this.state.task.status ? 'Finished' : 'Unfinished'}
        </span></div>
        <div>Expiry Date: {this.state.task.expiryDate}</div>
        {/* <div>{(Number(this.state.task.java)+ Number(this.state.task.fe) + Number(this.state.task.React))/3}</div> */}
      </div>
    )
  }
  render() {
    return (
      <div>

        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => this.onChange(e)} />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        <table className="table table-hover table-responsive-lg">
          <thead>
            <tr>
              <th style={{ width: "10%" }} className="text-center">#</th>
              <th style={{ width: "10%" }} className="text-center">Title</th>
              <th style={{ width: "10%" }} className="text-center">Description</th>
              <th style={{ width: "15%" }} >Detail</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItem()}
            {this.state.task && this.state.task.title && this.renderDetail()}
          </tbody>
        </table>
      </div>
    )

  }
}

export default Search;