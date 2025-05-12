import type { IIndexedDb } from './indexedDb'
import { IndexedDb } from './indexedDb'

/**
 * @method 初始化函数
 */
export function initIndexedDb({ dbName, version = 1, tables = [] }: IIndexedDb): Promise<IndexedDb> {
  const db = IndexedDb.getInstance({
    dbName,
    version,
    tables,
  })
  return db.open_db()
}

/**
 * @method 获取单例的单个对象
 */
export const getIndexedDbInstance = () => IndexedDb.getInstance()
