import { ReactNode } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

import Root from '../ui/Root'

type RootDataResponse = {
  getRootData: string[]
}

const ROOT_DATA = gql`
  query RootData {
    getRootData
  }
`

const RootPage = (): ReactNode => {
  const { data, loading, error } = useQuery<RootDataResponse>(ROOT_DATA)

  if (error) {
    throw error
  }

  return <Root data={data?.getRootData ?? []} loading={loading} />
}

export default RootPage
