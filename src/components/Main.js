import React, { Component } from 'react';
import Todo from './Todo.js'

const filter = (todos, index) => {
  switch (index) {
    case 0:
      return todos
    case 1:
      return todos.filter(todo => !todo.completed)
    case 2:
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    let todos = this.props.todos
    let filterTodos = filter(todos, this.props.filterIndex)
    let activeTodoCount = this.props.activeTodoCount

    return todos.length > 0 ? (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={activeTodoCount === 0}
          onChange={this.props.toggleAll}/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {  filterTodos.map((todo,index) => {
              return (
                <Todo
                  todo={todo}
                  key={index}
                  toggle={this.props.toggle}
                  remove={this.props.remove}
                  onEdit={this.props.onEdit}
                  editDone={this.props.editDone}
                  editCancle={this.props.editCancle}/>
              )
          }) }
        </ul>
      </section>
      ) : null
  }
}

export default Main