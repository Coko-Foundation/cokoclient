type SubscriptionOptions = {
  public: boolean
}

type Subscription = {
  unsubscribe: () => void
}

type SubscriptionEntry = {
  subscription: Subscription
  options: SubscriptionOptions
}

const defaultOptions: SubscriptionOptions = {
  public: false,
}

class SubscriptionManager {
  private subscriptions: Map<string, SubscriptionEntry>

  constructor() {
    this.subscriptions = new Map()
  }

  add(
    key: string,
    subscription: Subscription,
    optionOverrides: Partial<SubscriptionOptions> = {},
  ): void {
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, {
        subscription,
        options: { ...defaultOptions, ...optionOverrides },
      })
    }
  }

  remove(key: string): void {
    const entry = this.subscriptions.get(key)
    if (entry) {
      entry.subscription.unsubscribe()
      this.subscriptions.delete(key)
    }
  }

  clear(): void {
    this.subscriptions.forEach(entry => entry.subscription.unsubscribe())
    this.subscriptions.clear()
  }

  clearNonPublic(): void {
    this.subscriptions.forEach((entry, key) => {
      if (!entry.options.public) this.remove(key)
    })
  }
}

export default SubscriptionManager
