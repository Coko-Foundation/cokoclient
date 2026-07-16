/* eslint-disable react-hooks/rules-of-hooks */

import { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'
import { faker } from '@faker-js/faker'

import { Button, ButtonGroup, Checkbox } from '../../../src/ui'
import { type ThemeValue } from '../../../src/toolkit/themeHelper'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ButtonGroup,
  title: 'Common/ButtonGroup',
})

const btn1Text = faker.lorem.words(2)
const btn2Text = faker.lorem.words(2)
const btn3Text = faker.lorem.words(2)

const BtnGroup = styled(ButtonGroup)<{ showBorder?: boolean }>`
  ${(props): ThemeValue =>
    props.showBorder &&
    css`
      border: 2px solid firebrick;
    `}
`

const Check = styled(Checkbox)`
  margin-bottom: 20px;
`

export const Base = meta.story({
  render: (): ReactElement => {
    const [showBorder, setShowBorder] = useState(false)
    const [inline, setInline] = useState(false)

    return (
      <>
        <p>Toggle the checkbox to see the difference of inline vs not inline</p>

        <Check checked={inline} onChange={() => setInline(!inline)}>
          Make inline
        </Check>

        <Check checked={showBorder} onChange={() => setShowBorder(!showBorder)}>
          Show Border
        </Check>

        <div>
          <BtnGroup inline={inline} showBorder={showBorder}>
            <Button>{btn1Text}</Button>
            <Button status="success">{btn2Text}</Button>
            <Button status="danger">{btn3Text}</Button>
          </BtnGroup>
        </div>
      </>
    )
  },
})

export const Inline = meta.story({
  render: (): ReactElement => (
    <ButtonGroup inline>
      <Button>{btn1Text}</Button>
      <Button status="success">{btn2Text}</Button>
      <Button status="danger">{btn3Text}</Button>
    </ButtonGroup>
  ),
})

export const PullRight = meta.story({
  render: (): ReactElement => (
    <ButtonGroup justify="right">
      <Button>{btn1Text}</Button>
      <Button status="success">{btn2Text}</Button>
      <Button status="danger">{btn3Text}</Button>
    </ButtonGroup>
  ),
})

export const Center = meta.story({
  render: (): ReactElement => (
    <ButtonGroup justify="center">
      <Button>{btn1Text}</Button>
      <Button status="success">{btn2Text}</Button>
      <Button status="danger">{btn3Text}</Button>
    </ButtonGroup>
  ),
})
