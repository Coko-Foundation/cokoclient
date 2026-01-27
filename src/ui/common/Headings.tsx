import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

type HeadingProps = {
  className?: string
  children?: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5
}

const Heading = (props: HeadingProps): React.ReactNode => {
  const { className, children, level = 1 } = props

  return (
    <Title className={className} level={level}>
      {children}
    </Title>
  )
}

type HProps = Omit<HeadingProps, 'level'>

export const H1 = ({ children, className }: HProps): React.ReactNode => (
  <Heading className={className} level={1}>
    {children}
  </Heading>
)

export const H2 = ({ children, className }: HProps): React.ReactNode => (
  <Heading className={className} level={2}>
    {children}
  </Heading>
)

export const H3 = ({ children, className }: HProps): React.ReactNode => (
  <Heading className={className} level={3}>
    {children}
  </Heading>
)

export const H4 = ({ children, className }: HProps): React.ReactNode => (
  <Heading className={className} level={4}>
    {children}
  </Heading>
)

export const H5 = ({ children, className }: HProps): React.ReactNode => (
  <Heading className={className} level={5}>
    {children}
  </Heading>
)
