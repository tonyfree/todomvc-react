import React, { Component } from 'react';
import "todomvc-app-css/index.css";

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTodo: '',
      todos: [
        {
          name: "Taste JavaScript",
          completed: true,
          editing: false
        },
        {
          name: "Buy a unicorn",
          completed: false,
          editing: false
        }
      ],
      editingIndex: -1
    }
  }

  componentDidUpdate () {
    let index = this.state.editingIndex
    if (index < 0) return
    this.refs['editing'+index].focus()
  }

  handlerChange = (e) => {
    this.setState({
      newTodo: e.target.value
    })
  }

  add = (e) => {
    if (e.keyCode !== 13 ) return
    e.preventDefault()
    let newTodo = this.state.newTodo.trim()
    if (!newTodo) return
    let todos = this.state.todos
    todos.push({
      name: newTodo,
      completed: false,
      editing: false
    })
    this.setState({
      todos,
      newTodo: ''
    })
  }

  toggle = (todo, index) => {
    let todos = this.state.todos
    todos[index].completed = !todo.completed
    this.setState({todos})
  }

  toggleAll = (e) => {
    let allCompleted = e.target.checked
    let todos = this.state.todos
    todos.forEach(todo => {
      todo.completed = allCompleted
    })
    this.setState({todos})
  }

  remove = (index) => {
    let todos = this.state.todos
    todos.splice(index, 1)
    this.setState({todos})
  }

  edit = (index, e) => {
    let todos = this.state.todos
    todos.forEach((todo, i) => {
      todo.editing = i === index
    })
    this.setState({
      editingIndex: index,
      todos
    })
  }

  render() {
    let todos = this.state.todos

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0)

    let todoList = todos.map((todo,index) => {
      let classNames = `${todo.completed?'completed':''} ${todo.editing?'editing':''}`
      return (
        <li className={classNames} key={todo.name}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={e => this.toggle(todo, index, e)}/>
            <label onDoubleClick={e => this.edit(index, e)}>{todo.name}</label>
            <button className="destroy" onClick={e => this.remove(index, e)}></button>
          </div>
          <input
              className="edit"
              value={todo.name}
              ref={"editing"+index}
              onChange={this.add}/>
        </li>
      )
    })

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            autoFocus={true}
            onChange={this.handlerChange}
            onKeyDown={this.add}/>
        </header>
        {
          this.state.todos.length > 0 ? (
            <section className="main">
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={activeTodoCount === 0}
                onChange={this.toggleAll}/>
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                { todoList }
              </ul>
            </section>
          ) : null
        }
        {
          this.state.todos.length > 0 ? (
            <footer className="footer">
              <span className="todo-count">
                <strong>{activeTodoCount} </strong>
                {activeTodoCount === 1 ? 'item' : 'items'} left
              </span>
              <ul className="filters">
                <li>
                  <a className="selected" href="#/">All</a>
                </li>
                <li>
                  <a href="#/active">Active</a>
                </li>
                <li>
                  <a href="#/completed">Completed</a>
                </li>
              </ul>
              <button className="clear-completed">Clear completed</button>
            </footer>
          ) : null
        }
        </section>
    );
  }
}

export default App;
