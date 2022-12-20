
const BASE_URL = 'http://localhost:3000/todos';

export async function getTodoList() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return fetch(BASE_URL, options).then((response) => {
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
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }

  return fetch(`${BASE_URL}`, options).then((response) => {

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

export function updateTodo(editData, id) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editData)
  }

  return fetch(`${BASE_URL}/${id}`, options).then((response) => {
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

export function deleteTodo(id) {

  const options = {
    method: 'DELETE',
  }

  return fetch(`${BASE_URL}/${id}`, options).then((response) => {
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

export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo
}