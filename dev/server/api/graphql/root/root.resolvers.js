const { faker } = require('@faker-js/faker')

const { subscriptionManager, uuid } = require('@coko/server')

const TEST_OBECT_ADDED_EVENT = 'TEST_OBJECT_ADDED'

function wait(seconds) {
  const milliseconds = seconds * 1000

  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

function startSendingTestObjects() {
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

const getRootData = () => {
  const data = Array.from({ length: 10 }).map(() => faker.lorem.sentences(2))
  return data
}

const testObjects = () => {
  return [
    {
      id: uuid(),
      value: faker.lorem.sentences(1),
    },
  ]
}

module.exports = {
  Query: {
    getRootData,
    testObjects,
  },
  Subscription: {
    testObjectAdded: {
      subscribe: () => {
        return subscriptionManager.asyncIterator(TEST_OBECT_ADDED_EVENT)
      },
    },
  },
}
