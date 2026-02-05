/* eslint-disable no-console */

import { ReactNode, useState } from 'react'
import { faker } from '@faker-js/faker'

import { Table } from '../../../src/ui'
import { createData, randomPick } from '../_helpers'

type Datum = {
  age: number
  key: number
  name: string
  gender: 'Male' | 'Female'
}

const makeData = (n: number): Datum[] =>
  createData(n, (i: number) => ({
    age: faker.number.int({ min: 25, max: 55 }),
    key: i,
    name: faker.person.fullName(),
    gender: randomPick(['Male', 'Female']),
  }))

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
]

const data = makeData(8)

export const Base = (): ReactNode => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    rowSelection={{
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          `selectedRows: ${selectedRows}`,
        )
      },
    }}
  />
)

export const WithoutCheckboxes = (): ReactNode => (
  <Table columns={columns} dataSource={data} pagination={false} />
)

export const Interactive = (): ReactNode => {
  const TOTAL = 18
  const INITIAL_PAGE = 1
  const PAGE_SIZE = 10

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [dataSource, setDataSource] = useState(makeData(TOTAL))
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

  const handlePageChange = (pageNumber: number): void => {
    console.log(pageNumber)

    setLoading(true)

    setTimeout(() => {
      const isLastPage = TOTAL - PAGE_SIZE * pageNumber <= 0

      const howMany = isLastPage
        ? TOTAL - PAGE_SIZE * (pageNumber - 1)
        : PAGE_SIZE

      setLoading(false)
      setDataSource(makeData(howMany))
      setCurrentPage(pageNumber)
    }, 1000)
  }

  const handleSearch = (): void => {
    setLoading(true)
    setSearchLoading(true)

    setTimeout(() => {
      setCurrentPage(1)
      setLoading(false)
      setSearchLoading(false)
      setDataSource(makeData(TOTAL))
    }, 1000)
  }

  const handleSelectionChange = (
    selectedRowKeys: string[],
    selectedRows: unknown[],
  ): void => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      `selectedRows: ${selectedRows}`,
    )
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onSearch={handleSearch}
      pagination={{
        current: currentPage,
        onChange: handlePageChange,
        pageSize: PAGE_SIZE,
        total: TOTAL,
      }}
      rowSelection={{
        onChange: handleSelectionChange,
      }}
      searchLoading={searchLoading}
      searchPlaceholder="Search here"
      showSearch
    />
  )
}
