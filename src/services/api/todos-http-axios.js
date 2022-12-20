import axios from 'axios'


import { errorHandler } from '../../utils/utils.js'

const BASE_URL = 'http://localhost:3000/todos';

const instance = axios.create({
  baseURL: BASE_URL,
});

export async function getTodoList() {
  return instance.get().then(response => response.data).catch(errorHandler)
}

export function createTodo(payload) {
  return instance.post('/', payload).then(response => response.data).catch(errorHandler)
}

export function updateTodo(editData, id) {
  const url = `/${id}`
  return instance.put(url, editData).then(response => response.data).catch(errorHandler)
}

export function deleteTodo(id) {
  const url = `/${id}`
  return instance.delete(url).then(response => response.data).catch(errorHandler);
}

export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo
}