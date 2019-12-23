class TodoModel {
  constructor (storageName) {
    this.storageName = storageName
    if (storageName == undefined) {
      this.storageName = 'todos'
    }
    this.todos = JSON.parse(localStorage.getItem(this.storageName)) || []
    this.id = this.todos.length
  }

  _updateLocalStorage () {
    localStorage.setItem(this.storageName, JSON.stringify(this.todos))
  }

  checkTodo (id) {
    var el = this.todos.find(function (e) {
      return e.id === id
    })
    el.done = !el.done
    this._updateLocalStorage()
  }

  removeTodo (id) {
    this.todos = this.todos.filter(function (t) {
      return t.id !== id
    })
    this._updateLocalStorage()
  }

  addTodo (todovalue) {
    if (todovalue && todovalue.trim() !== '') {
      this.id++
      var todo = {
        value: todovalue.trim(),
        done: false,
        id: this.id
      }      
      this.todos.push(todo)
      this._updateLocalStorage()
      return this.id
    }
    return false
  }

  getFilteredList (filter) {
    return this.todos.filter(function (todo) {
      return todo.value.match(filter, 'i')
    })
  }
}