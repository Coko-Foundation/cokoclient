import styled from 'styled-components'

import { grid } from '../../toolkit'

import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'
import { ChatMessageProps } from './ChatMessage'

const Wrapper = styled.div`
  > div:first-child {
    margin-bottom: ${grid(5)};
  }
`

type ChatThreadProps = {
  className?: string
  messages?: Omit<ChatMessageProps, 'className'>[]
  onSend: (value: string) => void
}

const ChatThread = (props: ChatThreadProps) => {
  const { className, messages = [], onSend } = props

  return (
    <Wrapper className={className}>
      <ChatMessageList messages={messages} />
      <ChatInput onSend={onSend} />
    </Wrapper>
  )
}

export default ChatThread
