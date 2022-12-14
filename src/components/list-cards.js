const refs = {
  list: null,
}


export function renderCardsList(todos) {
  let template = '';
  refs.list = document.querySelector('[data-cards="list"]');

  todos.forEach((todo) => {
    template += createTodoTemplate(todo)
  });
  if (refs.list) {
    refs.list.innerHTML = template;
  }
}

function createTodoTemplate(todo) {
  const tmp = `<div class="card" style="width: 18rem;">
          <img src="${todo.image}" class="card-img-top"
            alt="todo image">
          <div class="card-body">
            <h5 class="card-title">${todo.title}</h5>
            <p class="card-text">${todo.description}</p>
            <a href="#" data-todo="btn-delete" data-todo-id="${todo.id}" class="btn btn-danger">delete</a>
            <a href="#" class="btn btn-primary" data-todo="btn-edit" data-todo-id="${todo.id}">edit</a>
          </div>
        </div>`
  return tmp;
}