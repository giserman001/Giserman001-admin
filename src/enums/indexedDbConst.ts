export const INDEXED_DB_NAME = 'jyws_db'

export const INDEXED_DB_VERSION = 1

export interface AmapBoundariesModel {
  id?: string
  name: string
  data: string
}

export const INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME = 'amapBoundaries'

export const INDEXED_DB_TABLES = [
  {
    tableName: INDEXED_DB_AMAP_BOUNDARIES_TABLE_NAME, // 表名
    option: { keyPath: 'id', autoIncrement: true }, // 指明主键为id
    indexs: [
      // 数据库索引
      {
        key: 'id',
        option: {
          unique: true,
        },
      },
      {
        key: 'name',
      },
      {
        key: 'data',
      },
    ],
  },
]
