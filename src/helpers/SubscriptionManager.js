const defaultOptions = {
  public: false,
}

class SubscriptionManager {
  constructor() {
    this.subscriptions = new Map()
  }

  add(key, subscription, optionOverrides = {}) {
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, {
        subscription,
        options: { ...defaultOptions, ...optionOverrides },
      })
    }
  }

  remove(key) {
    if (this.subscriptions.has(key)) {
      this.subscriptions.get(key).subscription.unsubscribe()
      this.subscriptions.delete(key)
    }
  }

  clear() {
    this.subscriptions.forEach(entry => entry.subscription.unsubscribe())
    this.subscriptions.clear()
  }

  clearNonPublic() {
    this.subscriptions.forEach((entry, key) => {
      if (!entry.options.public) this.remove(key)
    })
  }
}

export default SubscriptionManager
