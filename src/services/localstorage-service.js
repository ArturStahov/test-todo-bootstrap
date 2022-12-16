
const KEY = 'todo-save';

export function save(data) {
  const saveData = JSON.stringify(data);
  localStorage.setItem(KEY, saveData);
}

export function load() {
  let restoreData = null;
  if (localStorage.getItem(KEY)) {
    restoreData = JSON.parse(localStorage.getItem(KEY))
  }
  return restoreData;
}

export default {
  load,
  save,
}
