const { options } = require("../routes/todo")

new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }
      fetch('/api/todo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      }).then(res => res.json())
        .then(({todo}) => {
          this.todos.push(todo)
          this.todoTitle = ''
        }).catch(() => console.log(e))
    },
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    }
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }

      if (withTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    }
  }
})