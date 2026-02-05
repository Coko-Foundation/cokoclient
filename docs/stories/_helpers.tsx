import { ReactNode } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

import { type ThemeValue } from '../../src'

/**
 * Wrap components around this to show what they will look like
 * with the grey body background
 */
export const Background = styled.div`
  background: ${(props): ThemeValue => props.theme.colorBackground};
  padding: 40px;
`

const StyledFiller = styled.div`
  align-items: center;
  background: ${(props): ThemeValue => props.theme.colorSecondary};
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  margin-bottom: 16px;
  padding: 48px;
  text-align: justify;

  > div {
    font-weight: bold;
    text-align: center;
  }
`

/**
 * Just a block with some text in it
 */
export const Filler = (): ReactNode => {
  return (
    <StyledFiller>
      <div>Filler</div>
      <span>{faker.lorem.sentences(10)}</span>
    </StyledFiller>
  )
}

/**
 * Picks a random item from any given array
 */
export const randomPick = <T,>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

/**
 * Picks n values randomly from given array
 */
export const randomArray = <T,>(array: T[], n: number): T[] => {
  const res: T[] = []

  while (res.length < n) {
    const v = randomPick(array)
    if (!res.includes(v)) res.push(v)
  }

  return res
}

/**
 * Randomly picks true or false
 */
export const randomBool = (): boolean => randomPick([true, false])

/**
 * Creates an array of length n of whatever the callback returns
 */
export const createData = <T,>(n: number, callback: (i: number) => T): T[] =>
  Array.from(Array(n)).map((_, i) => callback(i))
