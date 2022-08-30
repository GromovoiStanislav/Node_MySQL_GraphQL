new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    const query = `
      query {
        getTodos {
          id title done createdAt updatedAt
        }
      }
    `;
    fetch("/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.todos = response.data.getTodos;
      });
  },
  methods: {
    compliteTodo(id) {
      const query = `
        mutation {
          compliteTodo(id:"${id}"){updatedAt}
        }
    `;
      fetch("/graphql", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((response) => {
          const idx = this.todos.findIndex((t) => t.id === id);
          this.todos[idx].updatedAt = response.data.compliteTodo.updatedAt;
        })
        .catch((err) => console.log(err));
    },

    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      const query = `
        mutation{
          createTodo(todo:{title:"${title}"}){title id createdAt updatedAt done}
        }
    `;
      fetch("/graphql", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((response) => {
          const todo = response.data.createTodo;
          this.todos.push(todo);
          this.todoTitle = "";
        })
        .catch((err) => console.log(err));
    },
    removeTodo(id) {
      const query = `
        mutation {
          deleteTodo(id:"${id}")
        }
    `;
      fetch("/graphql", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((err) => console.log(err));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      if (withTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(+value));
    },
  },
});
