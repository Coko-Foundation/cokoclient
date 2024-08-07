const { faker } = require('@faker-js/faker')

const getRootData = () => {
  const data = Array.from({ length: 10 }).map(() => faker.lorem.sentences(2))
  return data
}

module.exports = {
  Query: {
    getRootData,
  },
}
