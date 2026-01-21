import { Container, injectable, inject } from 'inversify'

// --- 1. Define Types ---
// Using Symbols is recommended to avoid naming collisions
const TYPES = {
  Logger: Symbol.for('Logger'),
  UserService: Symbol.for('UserService'),
}

// --- 2. Create the Injectable Services ---

@injectable()
class Logger {
  log(message: string) {
    console.log(`[Log]: ${message}`)
  }
}

@injectable()
class UserService {
  logger: Logger

  // We use @inject to tell Inversify which dependency to provide
  constructor(@inject(TYPES.Logger) logger: Logger) {
    this.logger = logger
  }

  signUp(name: string) {
    this.logger.log(`Signing up user: ${name}`)
    return { id: 1, name }
  }
}

// --- 3. Setup the Container ---
const myContainer = new Container()
myContainer.bind(TYPES.Logger).to(Logger)
myContainer.bind(TYPES.UserService).to(UserService)

// --- 4. Resolve and Use ---
const userService = myContainer.get(TYPES.UserService)
// @ts-ignore
userService.signUp('Alice')

export default {}
