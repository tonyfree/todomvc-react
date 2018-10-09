import React, { Component } from 'react';
import keys from './keysCode.js'

class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editingText: '',
      isEdinting: false
    }
  }

  componentDidUpdate () {
    this.refs.editing.focus()
  }

  edit = (todo) => {
    this.props.onEdit(todo)
    this.setState({
      editingText: todo.name
    })
  }

  editing = (e) => {
    this.setState({
      editingText: e.target.value,
      isEdinting: true
    })
  }

  editDone = (e) => {
    if (!this.state.isEdinting) return
    let name = this.state.editingText.trim()
    let todo = this.props.todo
    if (name) {
      this.props.editDone(todo, this.state.editingText)
    } else {
      this.props.remove(todo)
    }
    this.setState({
      isEdinting: false
    })
  }

  editKeyDown = (e) => {
    if (e.keyCode === keys.enter) {
      this.editDone()
    }
    if (e.keyCode === keys.escape) {
      this.setState({isEdinting: false})
      this.props.editCancle(this.props.todo)
    }
  }

  render () {
    let todo = this.props.todo
    let classNames = `${todo.completed?'completed':''} ${todo.editing?'editing':''}`
    return (
      <li className={classNames} key={todo.name}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={e => this.props.toggle(todo, e)}/>
          <label onDoubleClick={e => this.edit(todo, e)}>{todo.name}</label>
          <button className="destroy" onClick={e => this.props.remove(todo, e)}></button>
        </div>
        <input
            className="edit"
            value={this.state.editingText}
            ref="editing"
            onKeyDown={this.editKeyDown}
            onBlur={this.editDone}
            onChange={this.editing}/>
      </li>
    )
  }
}

export default Todo