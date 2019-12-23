describe('Testing the model alone', function () {

  beforeAll(function () {
    this.todosModel = new TodoModel('todoTest')
  })

  beforeEach(function () {
    localStorage.removeItem('todoTest')
    this.todosModel.todos = []
    this.todosModel.id = 0
  })

  it('should add an item', function () {
    var todo = 'complete the assignment'
    this.todosModel.addTodo(todo)
    expect(this.todosModel.todos.length).toBe(1);
  })

  it('should remove items', function () {
    var todo1 = 'check remove'
    var id1 = this.todosModel.addTodo(todo1)
    var todo2 = 'check remove again'
    var id2 = this.todosModel.addTodo(todo2)
    expect(this.todosModel.todos.length).toBe(2)
    this.todosModel.removeTodo(id1)
    expect(this.todosModel.todos.length).toBe(1)
    expect(this.todosModel.todos[0].id).toBe(id2)
  })

  it('should mark as done', function () {
    var todo = 'remember to submit the assignment'
    var id = this.todosModel.addTodo(todo)
    expect(this.todosModel.todos[0].done).toBe(false)
    this.todosModel.checkTodo(id)
    expect(this.todosModel.todos[0].done).toBe(true)
  })

  it('should filter the items', function() {
    var todo1 = 'first one'
    this.todosModel.addTodo(todo1)
    var todo2 = 'second one'
    this.todosModel.addTodo(todo2)
    var filteredList = this.todosModel.getFilteredList('first')
    expect(filteredList.length).toBe(1)
    filteredList = this.todosModel.getFilteredList('cond')
    expect(filteredList.length).toBe(1)
    filteredList = this.todosModel.getFilteredList('one')
    expect(filteredList.length).toBe(2)
  })
})

describe('Testing the todo app', function () {

  beforeAll(function () {
    this.todosModel = new TodoModel('todoTest')
    this.todosView = new TodoView(this.todosModel)
    this.enterKey = new KeyboardEvent('keydown', { keyCode: 13 })
  })

  beforeEach(function () {
    localStorage.removeItem('todoTest')
    this.todosModel.todos = []
    this.todosModel.id = 0
  })

  it('should handle todo add', function () {
    this.todosView.newTodoText.value = 'new todo 01'
    this.todosView.handleAddTodo()
    expect(this.todosModel.todos.length).toBe(1)
  })

  it('should handle enter key on todo add', function () {
    this.todosView.newTodoText.value = 'new todo 02'
    this.todosView.newTodoText.dispatchEvent(this.enterKey)
    expect(this.todosModel.todos.length).toBe(1)
  })

  it('should handle todo remove', function() {
    this.todosView.newTodoText.value = 'check remove'
    this.todosView.handleAddTodo()
    this.todosView.newTodoText.value = 'check remove again'
    this.todosView.handleAddTodo()
    expect(this.todosModel.todos.length).toBe(2)
    document.querySelectorAll(`.removeTodo`)[0].click()
    expect(this.todosModel.todos.length).toBe(1)
  })

  it('should handle todo mark as done', function() {
    this.todosView.newTodoText.value = 'remember to submit the assignment'
    this.todosView.handleAddTodo()
    expect(this.todosModel.todos[0].done).toBe(false)
    document.querySelectorAll(`.checkTodo`)[0].click()
    expect(this.todosModel.todos[0].done).toBe(true)
  })

  it('should handle enter key on filter', function() {
    this.todosView.newTodoText.value = 'first one'
    this.todosView.handleAddTodo()
    this.todosView.newTodoText.value = 'second one'
    this.todosView.handleAddTodo()
    this.todosView.filterTodos.value = 'first'
    this.todosView.filterTodos.dispatchEvent(this.enterKey)
    expect(this.todosView.filteredTotal.textContent).toEqual('# of filtered TODO: 1')
    this.todosView.filterTodos.value = 'one'
    this.todosView.filterTodos.dispatchEvent(this.enterKey)
    expect(this.todosView.filteredTotal.textContent).toEqual('# of filtered TODO: 2')
  })

})