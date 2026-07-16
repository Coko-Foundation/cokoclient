/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

import { List, Button, dndArrayMove } from '../../../src/ui'
import type { DragEndEvent } from '../../../src/ui'
import { type ThemeValue } from '../../../src/toolkit'
import { createData } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: List,
  title: 'Common/List',
})

const Item = styled.div`
  background: ${(props): ThemeValue => props.theme.colorBackgroundHue};
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
`

// returns the position of the item in a paginated list (as a String)
// eg. third item on page 2 will be 13
const getItemListNumber = (i: number, currentPage: number): string =>
  String(i + 1 + (currentPage - 1) * 10)

type StoryDataItem = {
  id: string
  value: string
  index: number
}

const makeData = (n: number): StoryDataItem[] =>
  Array.from(Array(n)).map((_, i) => ({
    id: String(i + 1),
    value: faker.lorem.sentence(),
    index: i,
  }))

const data = makeData(33)

const Wrapper = styled.div`
  /* height: 700px; */
`

export const Base = meta.story({
  render: (): React.ReactElement => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Wrapper>
        <List
          dataSource={data}
          loading={false}
          onSortOptionChange={null}
          pagination={{
            current: currentPage,
            onChange: setCurrentPage,
            pageSize: 10,
            total: data.length,
          }}
          renderItem={item => <Item>{item.value as string}</Item>}
          searchLoading={false}
          showSearch={false}
          showSort={false}
          showTotalCount={false}
          sortOptions={[]}
          totalCount={null}
        />
      </Wrapper>
    )
  },
})

export const Loading = meta.story({
  render: (): React.ReactElement => (
    <List
      dataSource={makeData(5)}
      loading
      renderItem={item => <Item>{item.value as string}</Item>}
    />
  ),
})

export const Search = meta.story({
  render: (): React.ReactElement => {
    const N = 27

    const [dataSource, setDataSource] = useState(makeData(N))
    const [searchLoading, setSearchLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const handleSearch = (): void => {
      setSearchLoading(true)
      setTimeout(() => {
        setSearchLoading(false)
        setDataSource(makeData(N))
        setCurrentPage(1)
      }, 2000)
    }

    return (
      <List
        dataSource={dataSource}
        loading={searchLoading}
        onSearch={handleSearch}
        pagination={{
          current: currentPage,
          onChange: setCurrentPage,
          pageSize: 10,
          total: dataSource.length,
        }}
        renderItem={item => <Item>{item.value as string}</Item>}
        searchLoading={searchLoading}
        searchPlaceholder={faker.lorem.words(5)}
        showSearch
      />
    )
  },
})

export const TotalCount = meta.story({
  render: (): React.ReactElement => {
    const N = 97
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <List
        dataSource={makeData(N)}
        pagination={{
          current: currentPage,
          onChange: setCurrentPage,
          pageSize: 10,
          total: N,
          showSizeChanger: false,
        }}
        renderItem={(item, _i) => <Item>{item.value as string}</Item>}
        showTotalCount
        totalCount={N}
      />
    )
  },
})

export const Sort = meta.story({
  render: (): React.ReactElement => {
    const N = 27

    const [dataSource, setDataSource] = useState(makeData(N))
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const sortOptions = [
      {
        label: 'One way',
        value: 'oneWay',
        isDefault: true,
      },
      {
        label: 'Or another',
        value: 'orAnother',
      },
    ]

    const handleSortOptionChange = (): void => {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setDataSource(makeData(N))
        setCurrentPage(1)
      }, 1000)
    }

    return (
      <List
        dataSource={dataSource}
        loading={loading}
        onSortOptionChange={handleSortOptionChange}
        pagination={{
          current: currentPage,
          onChange: setCurrentPage,
          pageSize: 10,
          total: dataSource.length,
        }}
        renderItem={item => <Item>{item.value as string}</Item>}
        showSort
        sortOptions={sortOptions}
      />
    )
  },
})

export const AsyncPagination = meta.story({
  render: (): React.ReactElement => {
    const PAGE_SIZE = 10
    const TOTAL = 62
    const INITIAL_PAGE = 1

    const [dataSource, setDataSource] = useState(makeData(PAGE_SIZE))
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
    const [loading, setLoading] = useState(false)

    const handlePageChange = (pageNumber: number, _pageSize: number): void => {
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

    return (
      <List
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: currentPage,
          onChange: handlePageChange,
          pageSize: PAGE_SIZE,
          total: TOTAL,
          showSizeChanger: false,
        }}
        renderItem={(item, i) => (
          <Item>
            {getItemListNumber(i, currentPage)}
            {'. '}
            {item.value as string}
          </Item>
        )}
      />
    )
  },
})

export const SelectableRows = meta.story({
  render: (): React.ReactElement => {
    const PAGE_SIZE = 10
    const TOTAL = 20
    const INITIAL_PAGE = 1

    const allData = React.useMemo(() => {
      return createData(TOTAL, (i: number) => ({
        id: String(i + 1),
        value: faker.lorem.sentences(2),
      }))
    }, [])

    const [dataSource, setDataSource] = useState(allData.slice(0, 10))
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
    const [loading, setLoading] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handlePageChange = (pageNumber: number, _pageSize: number): void => {
      setLoading(true)

      setTimeout(() => {
        const sliceFrom = (pageNumber - 1) * 10
        const sliceTo = sliceFrom + PAGE_SIZE
        const newData = allData.slice(sliceFrom, sliceTo)

        setLoading(false)
        setDataSource(newData)
        setCurrentPage(pageNumber)
        setSelectedItems([])
      }, 1000)
    }

    const handleSelectionChange = (selectedIds: string[]): void => {
      console.log('handled', selectedIds)
      setSelectedItems(selectedIds)
    }

    const BulkAction = (
      <Button onClick={() => console.log('bulk action')} type="primary">
        Assign handling editor
      </Button>
    )

    return (
      <List
        dataSource={dataSource}
        footerContent={BulkAction}
        itemSelection={{
          onChange: handleSelectionChange,
        }}
        loading={loading}
        pagination={{
          current: currentPage,
          onChange: handlePageChange,
          pageSize: PAGE_SIZE,
          total: TOTAL,
          showSizeChanger: false,
        }}
        renderItem={(item, _i) => (
          <Item>
            {item.id}: {item.value as string}
          </Item>
        )}
        selectedItems={selectedItems}
      />
    )
  },
})

export const PreserveSelection = meta.story({
  render: (): React.ReactElement => {
    const PAGE_SIZE = 10
    const TOTAL = 20
    const INITIAL_PAGE = 1

    const allData = React.useMemo(() => {
      return createData(TOTAL, (i: number) => ({
        id: String(i + 1),
        value: faker.lorem.sentences(2),
      }))
    }, [])

    const [dataSource, setDataSource] = useState(allData.slice(0, 10))
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
    const [loading, setLoading] = useState(false)

    // keep track of selected items in the parent component and pass them down to preserve selection between page changes
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handlePageChange = (pageNumber: number, _pageSize: number): void => {
      setLoading(true)

      setTimeout(() => {
        const sliceFrom = (pageNumber - 1) * 10
        const sliceTo = sliceFrom + PAGE_SIZE
        const newData = allData.slice(sliceFrom, sliceTo)

        setLoading(false)
        setDataSource(newData)
        setCurrentPage(pageNumber)
      }, 1000)
    }

    const handleSelectionChange = (selectedIds: string[]): void => {
      console.log('selected', selectedIds)
      setSelectedItems(selectedIds)
    }

    const BulkAction = (
      <Button onClick={() => console.log('bulk action')} type="primary">
        Assign handling editor
      </Button>
    )

    return (
      <>
        <p>Selected items: {selectedItems.length}</p>

        <List
          dataSource={dataSource}
          footerContent={BulkAction}
          itemSelection={{
            onChange: handleSelectionChange,
          }}
          loading={loading}
          pagination={{
            current: currentPage,
            onChange: handlePageChange,
            pageSize: PAGE_SIZE,
            total: TOTAL,
            showSizeChanger: false,
          }}
          renderItem={(item, _i) => (
            <Item>
              {item.id}: {item.value as string}
            </Item>
          )}
          selectedItems={selectedItems}
        />
      </>
    )
  },
})

export const EmptyList = meta.story({
  render: (): React.ReactElement => (
    <List
      dataSource={[]}
      renderItem={item => <Item>{item.value as string}</Item>}
    />
  ),
})

export const HidePagination = meta.story({
  render: (): React.ReactElement => {
    const N = 9

    return (
      <List
        dataSource={makeData(N)}
        renderItem={item => <Item>{item.value as string}</Item>}
        showPagination={false}
        showTotalCount
        totalCount={N}
      />
    )
  },
})

export const HidePaginationButUseAction = meta.story({
  render: (): React.ReactElement => {
    const N = 19

    const BulkAction = (
      <Button onClick={() => console.log('bulk action')} type="primary">
        Assign handling editor
      </Button>
    )

    return (
      <List
        dataSource={makeData(N)}
        footerContent={BulkAction}
        renderItem={item => <Item>{item.value as string}</Item>}
        showPagination={false}
        showTotalCount
        totalCount={N}
      />
    )
  },
})

export const DraggableItems = meta.story({
  render: (): React.ReactElement => {
    const [dataSource, setDataSource] = useState(makeData(10))
    const [currentPage, setCurrentPage] = useState(1)

    const handleDragEnd = (event: DragEndEvent): void => {
      const { active, over } = event

      // check if no destination, or if no rearrangement happened
      if (!over || active.id === over.id) return

      const oldIndex = dataSource.findIndex(item => item.id === active.id)
      const newIndex = dataSource.findIndex(item => item.id === over.id)

      setDataSource(dndArrayMove(dataSource, oldIndex, newIndex))
    }

    return (
      <List
        dataSource={dataSource}
        draggable
        onDragEnd={handleDragEnd}
        pagination={{
          current: currentPage,
          onChange: setCurrentPage,
          pageSize: 10,
          total: dataSource.length,
          showSizeChanger: false,
        }}
        renderItem={item => (
          <Item>
            {item.id} - {item.value as string}
          </Item>
        )}
        showTotalCount
        totalCount={dataSource.length}
      />
    )
  },
})
