import styled from 'styled-components'

const Wrapper = styled.div``

type Datum = {
  id: string
  value: string
}

type SubscriptionsTestProps = {
  data: Datum[]
}

const SubscriptionsTest = (props: SubscriptionsTestProps) => {
  const { data = [] } = props

  return (
    <Wrapper>
      {data.map(item => {
        return <div key={item.id}>{item.value}</div>
      })}
    </Wrapper>
  )
}

export default SubscriptionsTest
