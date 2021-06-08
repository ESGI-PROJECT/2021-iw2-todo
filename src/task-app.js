import { html, css } from 'lit';
import Base from './Base.js';

import { getTodos, getTodoToCreate, setTodo, setTodos } from './idb.js';

import { fetchTodos, createTodo } from './api/todos.js';
class TaskApp extends Base {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      todos: Array,
      isOnline: {
        type: Boolean,
        state: true
      }
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.isOnline = true;
  }

  async firstUpdated() {
    document.addEventListener('connection-changed', ({ detail }) => {
      this.isOnline = detail;
      if (this.isOnline) {
        this.syncData();
      }
    });
    if (this.isOnline && navigator.onLine) {
      const todos = await fetchTodos();
      this.todos = await setTodos(todos);
    } else {
      this.todos = await getTodos() || [];
    }
  }

  async handleCreate({ detail: todo }) {
    await setTodo(todo);
    if (this.isOnline && navigator.onLine) {
      await createTodo(todo);
      return this.todos = await getTodos();
    }
    todo.synced = 0;
    await setTodo(todo);
    return this.todos = await getTodos();
  }

  async syncData() {
    const toCreate = await getTodoToCreate();
    if (toCreate.length) {
      for(let todo of toCreate) {
        todo.synced = 1;
        const result = await createTodo(todo);
        if (result === false) {
          todo.synced = 0;
        }
        await setTodo(todo);
        return this.todos = await getTodos();
      }
    }
  }

  render() {
    return html`
      <section class="relative">
        <header class="h-14 bg-indigo-600 flex items-center justify-center text-white">
          <h1 class="text-2xl"><a href="/">Fire Task 🚀</a></h1>
        </header>
        <main>
          <task-list
            .todos="${this.todos}"
            @create-todo="${this.handleCreate}"></task-list>
        </main>
      </section>
    `;
  }
}

customElements.define('task-app', TaskApp);
