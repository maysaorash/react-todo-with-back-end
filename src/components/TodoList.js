import React from 'react';
import TodoItems from './TodoItems';
import TodoService from './todo.service';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItems = this.editItems.bind(this);
    
  }

  handleInput(e) {
    this.setState({
      newTask: e.target.value
    })
  }

  handleClick(e) {
    if(this.state.newTask.trim()){
      const todoItem = {
        title: this.state.newTask
      }

      TodoService.create(todoItem)
        .then((json) => {
          const newTasks = [...this.state.tasks, json.data] 
          this.setState({
            tasks: newTasks,
            newTask: ''
          })
        });
    } else {
      alert('Please enter a value')
    }
  }

  removeItem(id) {
    TodoService.delete(id).then(() => {
      const filteredTasks = this.state.tasks.filter(task => {
        return task.id !== id;
      })
      this.setState({
        tasks: filteredTasks
      })
    });
  }

  editItems(id, value){
    const todoItem = {
      title:value
    }
    // {title:value}
    TodoService.update(id,todoItem)
    .then(() => {
      const tasks = this.state.tasks;
      tasks.map(task => {
        if( task.id === id){
          task.title = value
        }
      })
      this.setState({tasks: tasks})
    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:8080/api/todoitems')
  //   .then((response) => response.json())
  //   .then((json) => this.setState({tasks: json}));
  // }
  componentDidMount() {
    TodoService.getAll()
    .then((json) => this.setState({tasks: json.data}));
  }
  render() {
    console.log(this.state.tasks)
    return (
      <div>
        <form>
          <input type="text" onInput={this.handleInput} value={this.state.newTask}/>
          <button type="button" onClick={this.handleClick}>Add</button>
        </form>
        <ul>
          <TodoItems editItems = {this.editItems} tasks={this.state.tasks} foo="bar" removeItem={this.removeItem}/>
        </ul>
      </div>
    )
  }

  componentDidUpdate() {
    console.log(this.state)
  }
}

export default TodoList;
