import React, { Component } from 'react';
import keys from './keysCode'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTodo: ''
    }
  }

  handlerChange = (e) => {
    this.setState({
      newTodo: e.target.value
    })
  }

  addTodo = (e) => {
    if (e.keyCode !== keys.enter ) return
    e.preventDefault()
    let newTodo = this.state.newTodo.trim()
    if (!newTodo) return
    this.props.add(newTodo)
    this.setState({
      newTodo: ''
    })
  }

  render () {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.newTodo}
          autoFocus={true}
          onChange={this.handlerChange}
          onKeyDown={e => this.addTodo(e)}/>
      </header>
    )
  }
}

export default Header
