import React from 'react'
import { ReactComponent } from './pin.svg'
import { MergeReactElementProps } from '../types'

interface PinProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', PinProps>

export const Pin = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#9a9a9a' } = props
    return <ReactComponent stroke={color} ref={ref} {...props} />
  }
)
