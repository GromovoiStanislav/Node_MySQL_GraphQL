const Todo = require("../models/todo");

const users = [
  { name: "John", age: 30, email: "john@mail.ru" },
  { name: "Igor", age: 34, email: "igor@mail.ru" },
];

module.exports = {
  test() {
    return { count: Math.ceil(Math.random() * 10), users };
  },
  random({ min, max, count }) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(Math.random() * (max - min) + min);
    }
    return arr;
  },
  addTestUser({ user: { name, email, age } }) {
    const user = { name, email, age };
    users.push(user);
    return user;
  },
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error("Fetch todos is non awailable");
    }
  },
  async createTodo({ todo }) {
    try {
      return await Todo.create({ title: todo.title, done: false });
    } catch (e) {
      throw new Error("Title is required");
    }
  },
  async compliteTodo({ id, done = true }) {
    try {
      const todo = await Todo.findByPk(id);
      todo.done = done;
      await todo.save();
      return todo;
    } catch (e) {
      throw new Error("ID is required");
    }
  },
  async deleteTodo({ id }) {
    try {
      const todos = await Todo.findAll({ where: { id } });
      await todos[0].destroy();
      return true;
    } catch (e) {
      throw new Error("ID is required");
    }
  },
};
