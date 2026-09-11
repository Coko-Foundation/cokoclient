import React, { createContext, ReactNode, useContext } from 'react'
import SubscriptionManager from './SubscriptionManager'

const managerInstance = new SubscriptionManager()
const SubscriptionManagerContext =
  createContext<SubscriptionManager>(managerInstance)

type SubscriptionManagerProviderProps = {
  children: ReactNode
}

export const SubscriptionManagerProvider = ({
  children,
}: SubscriptionManagerProviderProps): React.ReactNode => {
  return (
    <SubscriptionManagerContext.Provider value={managerInstance}>
      {children}
    </SubscriptionManagerContext.Provider>
  )
}

export const useSubscriptionManager = (): SubscriptionManager =>
  useContext(SubscriptionManagerContext)
