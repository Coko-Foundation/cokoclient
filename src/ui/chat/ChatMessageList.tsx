import React from 'react'
import styled from 'styled-components'

import { grid } from '../../toolkit'
import ChatMessage, { ChatMessageProps } from './ChatMessage'
import List, { ListItem } from '../common/List'

const Wrapper = styled.div`
  li:not(:last-child) {
    margin-bottom: ${grid(2)};
  }
`

type ChatItem = Omit<ChatMessageProps, 'className'>

type ChatMessageListProps = {
  className?: string
  messages: ChatItem[]
}

const ChatMessageList = (props: ChatMessageListProps): React.ReactNode => {
  const { className, messages = [] } = props

  return (
    <Wrapper className={className}>
      <List
        dataSource={messages}
        renderItem={(item: ListItem) => {
          const chatItem = item as unknown as ChatItem

          return (
            <ChatMessage
              content={chatItem.content}
              date={chatItem.date}
              id={chatItem.id}
              own={chatItem.own}
              user={chatItem.user}
            />
          )
        }}
      />
    </Wrapper>
  )
}

export default ChatMessageList
