/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import styled from 'styled-components'
// import { lorem } from '@faker-js/faker'

import { Spin, Switch as UISwitch, Text } from '../../../src/ui'
import { Filler } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Spin,
  title: 'Common/Spin',
})

const Top = styled.div`
  margin-bottom: 16px;
`

const Switch = styled(UISwitch)`
  margin-left: 8px;
`

const Wrapper = styled.div`
  background-color: papayawhip;
  height: 300px;
`

export const Base = meta.story({
  render: (): ReactElement => <Spin spinning />,
})

export const Wrap = meta.story({
  render: (): ReactElement => {
    const [spinning, setSpinning] = useState(true)

    return (
      <>
        <Top>
          <Text>Toggle loading state</Text>
          <Switch checked={spinning} onChange={() => setSpinning(!spinning)} />
        </Top>

        <Spin spinning={spinning}>
          <Filler />
        </Spin>
      </>
    )
  },
})

export const WrapButDoNotRenderBackground = meta.story({
  render: (): ReactElement => {
    const [spinning, setSpinning] = useState(true)

    return (
      <>
        <Top>
          <Text>Toggle loading state</Text>
          <Switch checked={spinning} onChange={() => setSpinning(!spinning)} />
        </Top>

        <Wrapper>
          <Spin renderBackground={false} spinning={spinning}>
            <Filler />
          </Spin>
        </Wrapper>
      </>
    )
  },
})
