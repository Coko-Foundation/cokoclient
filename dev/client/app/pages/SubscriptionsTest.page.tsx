import { ReactNode } from 'react'
import { gql } from '@apollo/client'
import {
  useQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client/react'

import SubscriptionsTest from '../ui/SubscriptionsTest'

const TEST_OBJECTS = gql`
  query TestObjects {
    testObjects {
      id
      value
    }
  }
`

const TEST_OBJECT_ADDED = gql`
  subscription TestObjectAdded {
    testObjectAdded {
      id
      value
    }
  }
`

type TestObject = {
  id: string
  value: string
}

type TestObjectsQueryData = {
  testObjects: TestObject[]
}

type TestObjectAddedSubscriptionData = {
  testObjectAdded: TestObject
}

const SubscriptionsTestPage = (): ReactNode => {
  const client = useApolloClient()
  const { data } = useQuery<TestObjectsQueryData>(TEST_OBJECTS)

  useSubscription<TestObjectAddedSubscriptionData>(TEST_OBJECT_ADDED, {
    onData: ({ data: subscriptionData }) => {
      const newTestObject = subscriptionData.data?.testObjectAdded
      if (!newTestObject) return

      const existingData = client.cache.readQuery<TestObjectsQueryData>({
        query: TEST_OBJECTS,
      })

      client.cache.writeQuery({
        query: TEST_OBJECTS,
        data: {
          testObjects: [...(existingData?.testObjects ?? []), newTestObject],
        },
      })
    },
  })

  return <SubscriptionsTest data={data?.testObjects} />
}

export default SubscriptionsTestPage
