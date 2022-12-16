
const BASE_URL = 'http://localhost:3000/todos';

export async function getTodoList() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return fetch(BASE_URL, options).then((response) => {
    console.log(response, 'response');
    if (response.ok) {
      return response.json();
    }
    if (response.status === 404) {
      throw new Error('Not found');
    }
    throw new Error('Something was wrong, try again');

  }).catch((error) => {
    throw new Error(error.message)
  })

}

export function createTodo(payload) {
  const createData = JSON.stringify(payload);
  const options = {
    methods: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: createData
  }


  return fetch(BASE_URL, options).then((response) => response.json()).catch((error) => {
    console.log(error), 'ERROR'
  })

}

export function updateTodo() {

}

export function deleteTodo() {

}

export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo
}