import type { HTMLAttributes } from 'react';

export interface MouseTooltipProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean
  offsetX: number
  offsetY: number
}
