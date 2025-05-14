// TODO:使用ts重写
// @ts-nocheck
const dbName = 'EasyDB'
const version = 1
let inited = false
const DBOpenRequest = indexedDB.open(dbName, version)
let db = {}

function initDB() {
  if (!inited) {
    return new Promise((resolve) => {
      DBOpenRequest.onsuccess = () => {
        db = DBOpenRequest.result
        inited = true
        resolve(true)
      }

      DBOpenRequest.onupgradeneeded = (event) => {
        console.log('onupgradeneeded')
        const db = event.target.result

        db.onerror = function () {
          throw new Error(`[EasyDB]: Open DB Error`)
        }

        const objectStore = db.createObjectStore(dbName, {
          keyPath: 'key',
          autoIncrement: false,
        })
        objectStore.createIndex('key', 'key')
        objectStore.createIndex('value', 'value')
      }
    })
  }
  else {
    return Promise.resolve(true)
  }
}

async function transaction() {
  await initDB()
  return db.transaction(dbName, 'readwrite').objectStore(dbName)
}

async function set(key, value) {
  const val = await get(key)
  if (!val) {
    return await _add(key, value)
  }
  else {
    return await _put(key, value)
  }
}

function get(key) {
  return operateDataBase('get', key)
}

function _put(key, value) {
  return operateDataBase('put', key, value)
}

function _add(key, value) {
  return operateDataBase('add', key, value)
}

function remove(key) {
  return operateDataBase('delete', key)
}

function clear() {
  return operateDataBase('clear')
}

function readAll() {
  return new Promise((resolve) => {
    const t = transaction()
    const data = []
    t.openCursor().onsuccess = function (event) {
      const cursor = event.target.result
      if (cursor) {
        data.push(cursor.value)
        cursor.continue()
      }
      else {
        resolve(data)
      }
    }
  })
}

function dbCallback(t, cb, type) {
  t.onsuccess = (event) => {
    ;['clear', 'delete'].includes(type) ? cb(true) : cb(event.target.result)
  }
  t.onerror = (event) => {
    throw new Error(`${dbName} Error:${event.target.error}`)
  }
}

function operateDataBase(type, key, value) {
  const data = key && value !== undefined ? { key, value } : key
  return new Promise((resolve) => {
    transaction().then((res) => {
      const tran = res[type](data)
      dbCallback(
        tran,
        (res) => {
          resolve(res)
        },
        type,
      )
    })
  })
}

initDB()

export default {
  set,
  get,
  remove,
  readAll,
  clear,
}
