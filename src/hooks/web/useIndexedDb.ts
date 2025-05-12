import type { AmapBoundariesModel } from '@/enums/indexedDbConst'
import { INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME } from '@/enums/indexedDbConst'
import { getIndexedDbInstance } from '@/utils/indexedDb'

export function useIndexedDb() {
  const dbIns = getIndexedDbInstance()

  const queryAmapBoundaries = async (filter: AmapBoundariesModel) => {
    const amapBoundaries = await dbIns.query<AmapBoundariesModel>({
      tableName: INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME,
      condition: (item) => {
        let flag = true
        for (const [k, v] of Object.entries(filter)) {
          if (item[k] !== v) {
            flag = false
            break
          }
        }
        return flag
      },
    })

    return amapBoundaries
  }

  const queryAmapBoundariesByName = async (name: string) => {
    const amapBoundaries = await dbIns.query_by_keyValue<AmapBoundariesModel>({
      tableName: INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME,
      key: 'name',
      value: name,
    })

    return amapBoundaries
  }

  const insertAmapBoundaries = async (data: AmapBoundariesModel) => {
    await dbIns.insert<AmapBoundariesModel>({
      tableName: INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME,
      data,
    })
  }

  return {
    queryAmapBoundaries,
    queryAmapBoundariesByName,
    insertAmapBoundaries,
  }
}
