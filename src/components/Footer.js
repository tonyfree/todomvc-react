import React, { Component } from 'react';

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterTypes: ['All', 'Active', 'Completed'],
    }
  }

  render () {
    let todos = this.props.todos
    let activeTodoCount = this.props.activeTodoCount
    return todos.length ? (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodoCount} </strong>
          {activeTodoCount === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
        {
          this.state.filterTypes.map((type,index) => {
            return (
              <li onClick={e => this.props.changeType(index,e)} key={index}>
                {/* eslint-disable-next-line */}
                <a className={this.props.filterIndex===index?"selected":""}>{type}</a>
              </li>
            )
          })
        }
        </ul>
        <button className="clear-completed" onClick={this.props.clear}>Clear completed</button>
      </footer>
    ) : null
  }
}

export default Footer