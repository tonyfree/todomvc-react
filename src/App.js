import React, { Component } from 'react';
import "todomvc-app-css/index.css";

const ENTER_KEY = 13
const ESCAPE_KEY = 27

const filter = (todos, type) => {
  switch (type) {
    case 'All':
      return todos
    case 'Active':
      return todos.filter(todo => !todo.completed)
    case 'Completed':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

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
      editingIndex: -1,
      editingText: '',
      filterTypes: ['All', 'Active', 'Completed'],
      filterIndex: 0
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
    if (e.keyCode !== ENTER_KEY ) return
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

  edit = (todo, index) => {
    let todos = this.state.todos
    todos.forEach(item => {
      if (item.name === todo.name) {
        item.editing = true
      } else {
        item.editing = false
      }
    })
    this.setState({
      editingIndex: index,
      editingText: todos[index].name,
      todos
    })
  }

  editing = (e) => {
    this.setState({
      editingText: e.target.value
    })
  }

  editDone = () => {
    let editingIndex = this.state.editingIndex
    if (editingIndex < 0) return
    let todos = this.state.todos
    let todo = todos[editingIndex]
    todo.editing = false
    todo.name = this.state.editingText
    this.setState({
      todos,
      editingIndex: -1,
      editingText: ''
    })
  }

  editKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY ) {
      this.editDone()
    }
    if (e.keyCode === ESCAPE_KEY ) {
      let todos = this.state.todos
      let todo = todos[this.state.editingIndex]
      todo.editing = false
      this.setState({
        editingIndex: -1,
        editingText: ''
      })
    }
  }

  clear = () => {
    let todos = this.state.todos.filter(todo => !todo.completed)
    this.setState({todos})
  }

  changeType = (index) => {
    this.setState({
      filterIndex: index
    })
  }

  render() {
    let todos = this.state.todos
    let filterTodos = filter(todos, this.state.filterTypes[this.state.filterIndex])

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0)

    let todoList = filterTodos.map((todo,index) => {
      let classNames = `${todo.completed?'completed':''} ${todo.editing?'editing':''}`
      return (
        <li className={classNames} key={todo.name}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={e => this.toggle(todo, index, e)}/>
            <label onDoubleClick={e => this.edit(todo, index, e)}>{todo.name}</label>
            <button className="destroy" onClick={e => this.remove(index, e)}></button>
          </div>
          <input
              className="edit"
              value={this.state.editingText}
              ref={"editing"+index}
              onKeyDown={this.editKeyDown}
              onBlur={this.editDone}
              onChange={this.editing}/>
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
              {
                this.state.filterTypes.map((type,index) => {
                  return (
                    <li onClick={e => this.changeType(index,e)} key={index}>
                      <a className={this.state.filterIndex===index?"selected":""}>{type}</a>
                    </li>
                  )
                })
              }
              </ul>
              <button className="clear-completed" onClick={this.clear}>Clear completed</button>
            </footer>
          ) : null
        }
        </section>
    );
  }
}

export default App;
