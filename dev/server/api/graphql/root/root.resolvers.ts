import { faker } from '@faker-js/faker'

import { subscriptionManager, uuid } from '@coko/server'

const TEST_OBECT_ADDED_EVENT = 'TEST_OBJECT_ADDED'

function wait(seconds: number): Promise<void> {
  const milliseconds = seconds * 1000

  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

function startSendingTestObjects(): void {
  /* eslint-disable-next-line promise/catch-or-return, promise/always-return */
  wait(3).then(() => {
    setInterval(() => {
      subscriptionManager.publish(TEST_OBECT_ADDED_EVENT, {
        testObjectAdded: {
          id: uuid(),
          value: faker.lorem.sentences(1),
        },
      })
    }, 2000)
  })
}

startSendingTestObjects()

const getRootData = (): string[] => {
  const data = Array.from({ length: 10 }).map(() => faker.lorem.sentences(2))
  return data
}

type TestObject = {
  id: string
  value: string
}

const testObjects = (): TestObject[] => {
  return [
    {
      id: uuid(),
      value: faker.lorem.sentences(1),
    },
  ]
}

export default {
  Query: {
    getRootData,
    testObjects,
  },
  Subscription: {
    testObjectAdded: {
      subscribe: (): AsyncIterableIterator<any> => {
        return subscriptionManager.asyncIterator(TEST_OBECT_ADDED_EVENT)
      },
    },
  },
}
