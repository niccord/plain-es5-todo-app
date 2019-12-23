'use strict'

class TodoView {

  constructor (todosModel, storageName) {
    this.todosModel = todosModel
    this.storageName = storageName
    if (storageName == undefined) {
      this.storageName = 'pagesize'
    }

    this.newTodoText = document.querySelector('#newTodoText')
    this.addTodoButton = document.querySelector('#addTodoButton')
    this.todoList = document.querySelector('#todoList')
    this.total = document.querySelector('#total')
    this.pageSize = document.querySelector('#pageSize')
    this.pageNumber = document.querySelector('#pageNumber')
    this.searchTodoButton = document.querySelector('#searchTodoButton')
    this.addFeedback = document.querySelector('#saveFeedback')
    this.deleteFeedback = document.querySelector('#deleteFeedback')
    this.pageSize.value = localStorage.getItem(this.storageName) || 5
    this.page = 0

    this.tdPrev = document.querySelector('td#prev')
    this.tdNext = document.querySelector('td#next')

    this.filterTodos = document.querySelector('#filterTodos')
    this.filteredTotal = document.querySelector('#filteredTotal')
    
    this.addFeedbackHandler = undefined;
    this.deleteFeedbackHandler = undefined;

    var self = this
    
    // filter todos
    this.filterTodos.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        self.renderList()
      }
    })
    
    this.searchTodoButton.addEventListener('click', function () {
      self.renderList()
    })
    
    // add todo
    this.addTodoButton.addEventListener('click', function (e) {
      self.handleAddTodo()
    })

    this.newTodoText.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        self.handleAddTodo()
      }
    })
    
    // change page size
    this.pageSize.addEventListener('change', function () {
      self.page = 0
      localStorage.setItem(this.storageName, self.pageSize.value)
    })
    
    // change page
    this.tdPrev.addEventListener('click', function () {
      if (self.page > 0) {
        self.page -= 1
        self.renderList()
      }
    })
  
    this.tdNext.addEventListener('click', function () {
      var intPageSize = parseInt(self.pageSize.value, 10)
      if ((self.page + 1) * intPageSize < self.todosModel.todos.length) {
        self.page += 1
        self.renderList()
      }
    })
    
    this.renderList()
  }

  renderList (renderIsNecessary) {
    if (renderIsNecessary == undefined) {
      renderIsNecessary = true
    }
    var valueToFilter = this.filterTodos.value
    var filteredList = this.todosModel.getFilteredList(valueToFilter)
    this.filteredTotal.style.display = this.filterTodos.value.trim() === '' ? 'none' : ''
    this.filteredTotal.textContent = '# of filtered TODO: ' + filteredList.length
    var intPageSize = parseInt(this.pageSize.value, 10)
    this.tdPrev.style.visibility = this.page === 0 ? 'hidden' : ''
    this.tdNext.style.visibility = (this.page + 1) * intPageSize >= filteredList.length ? 'hidden' : ''
    this.total.textContent = '# of TODO: ' + this.todosModel.todos.length
    if (renderIsNecessary || this.page + 1 === Math.ceil(filteredList.length / intPageSize)) {
      this.pageNumber.textContent = 'You are on page ' + (this.page + 1)
      var start = intPageSize * this.page
      var end = (intPageSize * (this.page + 1))
      var todoListStr = filteredList.slice(start, end).map(function render(cur) {
        var checked = cur.done ? 'checked' : ''
        var chk = `<input type="checkbox" id="check-${cur.id}" class="checkTodo" ${checked}>`
        var striked = cur.done ? 'class="striked"' : ''
        var value = `<label ${striked} for="check-${cur.id}">${cur.value}</label>`
        return `<div>${chk} ${value} <input type="button" id="removeTodo-${cur.id}" class="removeTodo" value="X"></div>`
      })
      this.todoList.innerHTML = todoListStr.join('')
      var self = this
      document.querySelectorAll(`.checkTodo`).forEach(function addCheckListener(chk) {
        var id = parseInt(chk.id.replace('check-', ''), 10)
        chk.addEventListener('click', function () {
          self.todosModel.checkTodo(id)
          var label = chk.parentElement.querySelector('label')
          label.classList.toggle('striked')
        })
      })
      document.querySelectorAll(`.removeTodo`).forEach(function addRemoveListener(btn) {
        var id = parseInt(btn.id.replace('removeTodo-', ''), 10)
        function removeWrapper () {
          self.deleteFeedback.classList.remove('notVisible')
          if (self.deleteFeedbackHandler) {
            clearTimeout(self.deleteFeedbackHandler)
          }
          self.deleteFeedbackHandler = setTimeout(function () {
            self.deleteFeedback.classList.add('notVisible')
          }, 2000)
          self.todosModel.removeTodo(id)
          self.page = 0
          self.renderList()
        }
        btn.addEventListener('click', removeWrapper)
      })
    }
  }

  encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  handleAddTodo() {
    var todovalue = this.encodeHTML(this.newTodoText.value)
    if (this.todosModel.addTodo(todovalue)) {
      this.addFeedback.classList.remove('notVisible')
      if (this.addFeedbackHandler) {
        clearTimeout(this.addFeedbackHandler)
      }
      var self = this
      this.addFeedbackHandler = setTimeout(function () {
        self.addFeedback.classList.add('notVisible')
      }, 2000)
      this.renderList(false)
      this.newTodoText.focus()
      this.newTodoText.value = ''
    } else {
      alert("The to-do item can't be empty or made by spaces")
    }
  }
  
}
