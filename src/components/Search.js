import React from 'react';
import { filter, includes, orderBy as funcOrderBy, remove, reject, isDate } from 'lodash';
import { taskData } from '../mocks/taskData';
const currentDate = new Date().toISOString().split('T')[0];

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: taskData,
      searchTasks: taskData,
      task: {},
      currentPage: 1,
      tasksPerPage: 5 // Số lượng phần tử trên mỗi trang
    };
  }

  onChange = (e) => {
    this.setState({
      searchTasks: this.state.tasks.filter(item =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.description.toLowerCase().includes(e.target.value.toLowerCase())
      ),
      currentPage: 1 // Reset về trang đầu khi tìm kiếm
    });
  }

  showDetail = (item) => {
    this.setState({ task: item });
  }

  renderItems = () => {
    const { searchTasks, currentPage, tasksPerPage } = this.state;
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = searchTasks.slice(indexOfFirstTask, indexOfLastTask);

    return currentTasks.map((item, index) => (
      <tr key={item.id} className={item.complete === 1 ? "line-click" : ""}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => this.showDetail(item)}>View</button>
        </td>
      </tr>
    ));
  }

  // Phương thức để chuyển đến trang khác
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }

  renderPagination = () => {
    const { searchTasks, tasksPerPage } = this.state;
    const pageNumbers = Math.ceil(searchTasks.length / tasksPerPage);

    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${this.state.currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => this.handlePageChange(this.state.currentPage - 1)}>Previous</a>
          </li>
          {Array.from({ length: pageNumbers }, (_, index) => (
            <li key={index} className={this.state.currentPage === index + 1 ? "page-item active" : "page-item"}>
              <a className="page-link" onClick={() => this.handlePageChange(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${this.state.currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => this.handlePageChange(this.state.currentPage + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }

  renderDetail() {
    const { task } = this.state;
    return (
      <div className="task-detail">
        <div className="task-title">Detail</div>
        <div className="task-field">
          <div className="task-label">Title:</div>
          <div className="task-value">{task.title}</div>
        </div>
        <div className="task-field">
          <div className="task-label">Description:</div>
          <div className="task-value">{task.description}</div>
        </div>
        <div className="task-field">
          <div className="task-label">Status:</div>
          <div className="task-value" style={{ color: task.status === 1 ? 'blue' : task.status === 2 ? 'purple' : 'green' }}>
            {task.status === 1 ? 'Open' : task.status === 2 ? 'In Progress' : 'Closed'}
          </div>
        </div>
        <div className="task-field">
          <div className="task-label">Start Date:</div>
          <div className="task-value">{task.startDate}</div>
        </div>
        <div className="task-field">
          <div className="task-label">End Date:</div>
          <div className="task-value">{task.endDate}</div>
        </div>
        <div className="task-task">{task.status === 3 ? 'Task đã hoàn thành' :
          task.status === 2 && task.endDate >= currentDate ? 'Task đang thực hiện' :
            task.status === 1 && task.startDate >= currentDate ? 'Task chưa bắt đầu' : 'Task trễ hạn'}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => this.onChange(e)} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Clear</button>
          </form>
        </nav>
        <table className="table table-hover table-responsive-lg">
          <thead>
            <tr>
              <th style={{ width: "10%" }} className="text-center">#</th>
              <th style={{ width: "20%" }} className="text-center">Title</th>
              <th style={{ width: "30%" }} className="text-center">Description</th>
              <th style={{ width: "15%" }} >Detail</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}

          </tbody>
        </table>
        {this.state.task && this.state.task.title && this.renderDetail()}
        {this.renderPagination()}
      </div>
    );
  }
}

export default Search;