import type { ColumnConfig } from '@/types/column-config';

export type Task = {
  id: string;
  text: string;
  column: ColumnConfig['id']
}
