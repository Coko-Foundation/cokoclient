/**
 * Spinner code license here (MIT): https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE
 */

import React, { ComponentProps } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Spin as AntSpin } from 'antd'

import { grid, type ThemeValue } from '../../toolkit'

type IndicatorProps = {
  size?: number
  className?: string
}

type SpinProps = Omit<ComponentProps<typeof AntSpin>, 'size'> & {
  size?: number
  renderBackground?: boolean
}

type StyledSpinProps = {
  $isNested?: boolean
  $renderBackground?: boolean
}

const StyledSpin = styled(AntSpin)<StyledSpinProps>`
  ${(props): ThemeValue =>
    props.$isNested &&
    css`
      z-index: 4;

      > .ant-spin-section {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20px;
      }
    `};
`

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
`

const IndicatorWrapper = styled.div<{ $size: number }>`
  &&& {
    height: ${(props): string => grid(props.$size)(props)};
    position: relative;
    width: ${(props): string => grid(props.$size)(props)};
  }
`

const BounceOne = styled.div`
  animation: ${bounce} 2s infinite ease-in-out;
  background-color: ${(props): ThemeValue => props.theme.colorPrimary};
  border-radius: 50%;
  height: 100%;
  left: 0;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 100%;
`

const BounceTwo = styled(BounceOne)`
  animation-delay: -1s;
`

const NestedWrapper = styled.div`
  height: 100%;

  .ant-spin-nested-loading {
    height: 100%;

    > div {
      height: 100%;

      > div.ant-spin-spinning {
        height: 100%;
      }
    }
  }
`

export const Indicator = ({
  size = 10,
  className,
}: IndicatorProps): React.ReactNode => (
  <IndicatorWrapper $size={size} className={className}>
    <BounceOne />
    <BounceTwo />
  </IndicatorWrapper>
)

const Spin = (props: SpinProps): React.ReactNode => {
  const {
    className,
    children,
    renderBackground = true,
    size = 10,
    spinning,
    ...rest
  } = props

  const showChildren = renderBackground || (!renderBackground && !spinning)

  const spin = (
    <StyledSpin
      $isNested={!!children}
      $renderBackground={renderBackground}
      className={className}
      indicator={<Indicator size={size} />}
      spinning={spinning}
      {...rest}
    >
      {showChildren && children}
    </StyledSpin>
  )

  if (!showChildren) return <NestedWrapper>{spin}</NestedWrapper>
  return spin
}

export default Spin
