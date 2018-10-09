import React, { Component } from 'react';
import "todomvc-app-css/index.css";
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
      filterIndex: 0
    }
  }

  add = (newTodo) => {
    let todos = this.state.todos
    todos.push({
      name: newTodo,
      completed: false,
      editing: false
    })
    this.setState({todos})
  }

  toggle = (todo) => {
    let todos = this.state.todos
    let index = todos.findIndex(item => item.name === todo.name)
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

  remove = (todo) => {
    let todos = this.state.todos
    let index = todos.findIndex(item => item.name === todo.name)
    todos.splice(index, 1)
    this.setState({todos})
  }

  onEdit = (todo) => {
    let todos = this.state.todos
    todos.forEach(item => {
      item.editing = item.name === todo.name
    })
    this.setState({todos})
  }

  editDone = (todo, newName) => {
    let todos = this.state.todos
    let index = todos.findIndex(item => item.name === todo.name)
    todos[index].editing = false
    todos[index].name = newName
    this.setState({todos})
  }

  editCancle = (todo) => {
    let todos = this.state.todos
    let index = todos.findIndex(item => item.name === todo.name)
    todos[index].editing = false
    this.setState({todos})
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
    let filterIndex=this.state.filterIndex
    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0)

    return (
      <section className="todoapp">
        <Header add={this.add}/>
        <Main
          todos={todos}
          filterIndex={filterIndex}
          activeTodoCount={activeTodoCount}
          toggleAll={this.toggleAll}
          toggle={this.toggle}
          remove={this.remove}
          onEdit={this.onEdit}
          editDone={this.editDone}
          editCancle={this.editCancle}/>
        <Footer
          todos={todos}
          filterIndex={filterIndex}
          changeType={this.changeType}
          clear={this.clear}
          activeTodoCount={activeTodoCount}/>
      </section>
    );
  }
}

export default App;
