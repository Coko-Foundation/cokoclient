/* eslint-disable global-require */

const seedAdminUser = async () => {
  const { logger, useTransaction } = require('@coko/server')

  const User = require('@coko/server/src/models/user/user.model')
  const Identity = require('@coko/server/src/models/identity/identity.model')
  const Team = require('@coko/server/src/models/team/team.model')

  const info = msg => {
    const prefix = `--- Seed scripts =>`
    logger.info(`${prefix} ${msg}`)
  }

  info('Seeding admin user...')

  const data = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    givenNames: 'Admin',
    surname: 'Adminius',
    agreedTc: true,
  }

  const exists = await User.findOne({
    username: data.username,
  })

  if (exists) {
    info('Admin user already exists')
    return
  }

  const { email, ...restData } = data

  await useTransaction(async trx => {
    const newUser = await User.insert(
      {
        ...restData,
      },
      { trx },
    )

    await Identity.insert(
      {
        userId: newUser.id,
        email,
        isSocial: false,
        isVerified: true,
        isDefault: true,
      },
      { trx },
    )

    await Team.addMemberToGlobalTeam(newUser.id, 'admin', { trx })

    info(`Admin user with id ${newUser.id} successfully created`)
  })
}

module.exports = seedAdminUser
