import type { ColumnConfig } from '@/types/column-config';

export const columnsConfig: Array<ColumnConfig> = [
  {
    id: 1,
    title: 'На согласовании',
    color: '#FF99E9'
  },
  {
    id: 2,
    title: 'Новые',
    color: '#66B8FF'
  },
  {
    id: 3,
    title: 'В процессе',
    color: '#FFD466'
  },
  {
    id: 4,
    title: 'Готово',
    color: '#53C666'
  },
  {
    id: 5,
    title: 'Доработать',
    color: '#F76E85'
  }
]

export const columnsConfigMap = columnsConfig.reduce<Record<ColumnConfig['id'], ColumnConfig>>((map, column) => {
  map[column.id] = column
  return map
}, {})