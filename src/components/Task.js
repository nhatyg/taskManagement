import React from 'react';
import { filter, includes, orderBy as funcOrderBy, remove, reject } from 'lodash';
import { taskData } from '../mocks/task'
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
        expiryDate: ''
      },
      editingTask: null,
      showForm: false,
      filterStatus: 'all'
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
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
        expiryDate: ''
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

  renderItem() {
    const { filterStatus } = this.state;
    const filteredTasks = this.state.tasks.filter(task => {
      if (filterStatus === 'all') {
        return true;
      }
      return task.status.toString() === filterStatus;
    });

    return filteredTasks.map((item, index) => {
      if (this.state.editingTask && this.state.editingTask.id === item.id) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
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
                name="expiryDate"
                value={this.state.editingTask.expiryDate}
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
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td><span style={{ color: item.status === 1 ? 'blue' : item.status === 2 ? 'purple' : 'green' }}>
            {item.status === 1 ? 'Open' : item.status === 2 ? 'In Progress' : 'Closed'}
          </span></td>
          <td>{item.expiryDate}</td>
          <td>
            <button type="button" class="btn btn-outline-danger" onClick={() => this.handleDelete(item.id)}>Delete</button>
            <button type="button" class="btn btn-outline-success" onClick={() => this.handleEdit(item)}>Edit</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.showForm && ( // Show the form only when showForm is true
          <form onSubmit={this.handleAdd}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={this.state.newTask.title}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={this.state.newTask.description}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                value={this.state.newTask.expiryDate}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button class="btn btn-outline-primary">Add Task</button>
          </form>
        )}
        <form onSubmit={this.handleFormSubmit}>
          <div>
            {/* ... code hiển thị các nút lọc */}
            <button onClick={() => this.handleFilterChange('all')}>All</button>
            <button onClick={() => this.handleFilterChange('1')}>Open</button>
            <button onClick={() => this.handleFilterChange('2')}>In Progress</button>
            <button onClick={() => this.handleFilterChange('3')}>Closed</button>
          </div>
          <table className="table table-hover table-responsive-lg">
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
          <button type="button" class="btn btn-outline-primary" onClick={this.toggleForm}>New Task</button>
        </form>
      </div>
    );
  }
}

export default TaskList;