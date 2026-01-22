import React, { createContext, useContext } from 'react'
import SubscriptionManager from './SubscriptionManager'

const SubscriptionManagerContext = createContext()
const managerInstance = new SubscriptionManager()

export const SubscriptionManagerProvider = ({ children }) => {
  return (
    <SubscriptionManagerContext.Provider value={managerInstance}>
      {children}
    </SubscriptionManagerContext.Provider>
  )
}

export const useSubscriptionManager = () =>
  useContext(SubscriptionManagerContext)
