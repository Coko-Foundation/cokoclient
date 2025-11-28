import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

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

const ProfilePage = props => {
  const { data, subscribeToMore } = useQuery(TEST_OBJECTS)

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: TEST_OBJECT_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newTestObject = subscriptionData.data.testObjectAdded
        if (!prev) return { testObjects: [newTestObject] }

        return {
          ...prev,
          testObjects: [...prev.testObjects, newTestObject],
        }
      },
    })

    return () => unsubscribe()
  }, [subscribeToMore])

  return <SubscriptionsTest data={data?.testObjects} />
}

export default ProfilePage
