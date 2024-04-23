import React from 'react';
import { taskData } from '../mocks/taskData'
import { v4 as uuidv4 } from 'uuid';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: taskData,
      newTask: {
        id: '',
        title: '',
        description: '',
        status: 1,
        startDate: '',
        endDate: ''
      },
      editingTask: null,
      showForm: false,
      filterStatus: 'all',
      currentPage: 1,
      tasksPerPage: 5
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }


  toggleForm() {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  }

  handleDelete(id) {
    let data = [...this.state.tasks].filter(item => item.id !== id);
    this.setState({
      tasks: data
    })

  }

  handleAdd(event) {
    event.preventDefault();
    const newTask = {
      ...this.state.newTask,
      id: uuidv4(),
      status: 1 // Mặc định là 'Open'
    };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      newTask: {
        id: '',
        title: '',
        description: '',
        status: 1,
        startDate: '',
        endDate: ''
      }
    }));
  }

  handleEdit(task) {
    this.setState({
      editingTask: task
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    if (this.state.editingTask) {
      this.setState(prevState => ({
        editingTask: {
          ...prevState.editingTask,
          [name]: value
        }
      }));
    } else {
      this.setState(prevState => ({
        newTask: {
          ...prevState.newTask,
          [name]: value
        }
      }));
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.editingTask) {
      // Nếu có task đang được sửa, cập nhật thông tin task đó
      const updatedTasks = this.state.tasks.map(task => {
        if (task.id === this.state.editingTask.id) {
          return this.state.editingTask;
        }
        return task;
      });
      this.setState({
        tasks: updatedTasks,
        editingTask: null
      });
    }
  }

  handleFilterChange(filterStatus) {
    this.setState({
      filterStatus: filterStatus
    });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  renderPagination() {
    const { filterStatus, currentPage, tasksPerPage } = this.state;
    const filteredTasks = this.state.tasks.filter(task => {
      if (filterStatus === 'all') {
        return true;
      }
      return task.status.toString() === filterStatus;
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredTasks.length / tasksPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => this.handlePageChange(currentPage - 1)}>Previous</a>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={() => this.handlePageChange(number)}>
                {number}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => this.handlePageChange(currentPage + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }

  render() {
    const { filterStatus, currentPage, tasksPerPage } = this.state;
    const filteredTasks = this.state.tasks.filter(task => {
      if (filterStatus === 'all') {
        return true;
      }
      return task.status.toString() === filterStatus;
    });
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    return (
      <div>
        {this.state.showForm && ( // Show the form only when showForm is true
          <form onSubmit={this.handleAdd}>
            <div className="form-row">
              <div className="col">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={this.state.newTask.title}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="col">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={this.state.newTask.description}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={this.state.newTask.startDate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="col">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={this.state.newTask.endDate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
            <button type="button" className="btn btn-secondary" onClick={this.toggleForm}>Cancel</button>
          </form>
        )}
        <form onSubmit={this.handleFormSubmit}>
          <table className="table table-hover table-responsive-lg">
            <thead>
              <tr>
                <th style={{ width: "10%" }} className="text-center">Title</th>
                <th style={{ width: "30%" }} className="text-center">Description</th>
                <th style={{ width: "17%" }} className="text-center">
                  <select className="form-select" value={this.state.filterStatus} onChange={(e) => this.handleFilterChange(e.target.value)}>
                    <option value="all">Status</option>
                    <option value="1">Open</option>
                    <option value="2">In Progress</option>
                    <option value="3">Closed</option>
                  </select>
                </th>
                <th style={{ width: "12%" }} className="text-center">Start Date</th>
                <th style={{ width: "12%" }} className="text-center">End Date</th>
                <th style={{ width: "25%" }} >Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((item, index) => {
                if (this.state.editingTask && this.state.editingTask.id === item.id) {
                  return (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          name="title"
                          value={this.state.editingTask.title}
                          onChange={this.handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          value={this.state.editingTask.description}
                          onChange={this.handleInputChange}
                        />
                      </td>
                      <td>
                        <select
                          name="status"
                          value={this.state.editingTask.status}
                          onChange={this.handleInputChange}
                        >
                          <option value={1}>Open</option>
                          <option value={2}>In Progress</option>
                          <option value={3}>Closed</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="startDate"
                          value={this.state.editingTask.startDate}
                          onChange={this.handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="endDate"
                          value={this.state.editingTask.endDate}
                          onChange={this.handleInputChange}
                        />
                      </td>
                      <td>
                        <button class="btn btn-outline-success" onClick={this.handleFormSubmit}>Save</button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td><span style={{ color: item.status == 1 ? 'blue' : item.status == 2 ? 'purple' : 'green' }}>
                      {item.status == 1 ? 'Open' : item.status == 2 ? 'In Progress' : 'Closed'}
                    </span></td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger" onClick={() => this.handleDelete(item.id)}>Delete</button>
                      <button type="button" class="btn btn-outline-success" onClick={() => this.handleEdit(item)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="button" class="btn btn-outline-primary" onClick={this.toggleForm} style={{ marginLeft: '970px' }}>New Task</button>
          <div className="pagination">
            {this.renderPagination()}
          </div>

        </form>
      </div>
    );
  }
}

export default TaskList;