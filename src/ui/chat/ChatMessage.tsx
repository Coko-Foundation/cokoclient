import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { grid, th, ThemeValue } from '../../toolkit'

import { DateParser } from '../common'

const pullRight = css`
  margin-left: auto;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

const Message = styled.div<{ $own?: boolean }>`
  background: ${(props): ThemeValue =>
    props.$own ? th('colorPrimary') : th('colorSecondary')};
  border-radius: 3px;
  color: ${(props): ThemeValue =>
    props.$own ? th('colorTextReverse') : th('colorText')};
  display: inline-block;
  max-width: 90%;
  padding: ${grid(2)};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${(props): ThemeValue =>
    props.$own &&
    css`
      ${pullRight}

      span {
        ${pullRight}
      }
    `}
`

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
`

const Content = styled.div``

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  margin-top: ${grid(2)};
`

export type ChatMessageProps = {
  id: string
  className?: string
  content: string
  date: string
  own?: boolean
  user: string
}

const ChatMessage = (props: ChatMessageProps): ReactNode => {
  const { className, content, date, own = false, user = null } = props

  return (
    <Wrapper className={className}>
      <Message $own={own}>
        {!own && <Name>{user}</Name>}

        <Content>{content}</Content>

        <Date>
          <DateParser timestamp={date} />
        </Date>
      </Message>
    </Wrapper>
  )
}

export default ChatMessage
