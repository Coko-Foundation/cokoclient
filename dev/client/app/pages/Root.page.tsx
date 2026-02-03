import { ReactNode } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

import Root from '../ui/Root'

const ROOT_DATA = gql`
  query RootData {
    getRootData
  }
`

const RootPage = (): ReactNode => {
  const { data, loading, error } = useQuery(ROOT_DATA)

  if (error) {
    throw new Error(error)
  }

  return <Root data={data && data.getRootData} loading={loading} />
}

export default RootPage
