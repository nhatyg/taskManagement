import React from 'react';
import { filter, includes, orderBy as funcOrderBy, remove, reject } from 'lodash';
import { taskData } from '../mocks/task'

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: taskData
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id) {
    let data = [...this.state.tasks].filter(item => item.id !== id);
    this.setState({
      tasks: data
    })

  }

  renderItem = () => {
    const elmItem = this.state.tasks.map((item, index) => {
      return (
        <tr className={item.complete === 1 ? "line-click" : ""}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td><span style={{ color: item.status ? 'green' : 'red' }}>
            {item.status ? 'Finished' : 'Unfinished'}
          </span></td>
          <td>{item.expiryDate}</td>
          <td>
            <button type="button" class="btn btn-outline-danger" onClick={() => this.handleDelete(item.id)}>Delete</button>
            <button type="button" class="btn btn-outline-success">Edit</button>
          </td>
        </tr>
      )
    });
    return elmItem
  }
  render() {
    return (
      
      <table className="table table-hover table-responsive-lg">
        <tbody>
          <tr>
            <td>
              <button type="button" className="btn btn-outline-success" onClick={this.handleDelete}>
                New Task
              </button>
            </td>
          </tr>
        </tbody>
          
        <thead>
          <tr>
            <th style={{ width: "5%" }} className="text-center">#</th>
            <th style={{ width: "10%" }} className="text-center">Title</th>
            <th style={{ width: "30%" }} className="text-center">Description</th>
            <th style={{ width: "10%" }} className="text-center">Status</th>
            <th style={{ width: "15%" }} className="text-center">Expiry Date</th>
            <th style={{ width: "30%" }} >Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderItem()}
        </tbody>
      </table>
    )

  }
}

export default TaskList;