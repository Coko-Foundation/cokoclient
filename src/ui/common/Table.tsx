import { useEffect, useState, ComponentProps, useMemo, ReactNode } from 'react'
import styled from 'styled-components'
import { Table as AntTable } from 'antd'

import { grid } from '../../toolkit'
import { noop } from '../../toolkit/funcs'

import Search from './Search'
import Spin from './Spin'
import Pagination from './Pagination'

type PaginationConfig = {
  current?: number
  total?: number
  pageSize?: number
  itemRender?:
    | ((page: number, type: string, originalElement: ReactNode) => ReactNode)
    | null
  showSizeChanger?: boolean
  onShowSizeChange?: (current: number, size: number) => void
  onChange?: (page: number, pageSize: number) => void
}

type TableProps = ComponentProps<typeof AntTable> & {
  loading?: boolean
  showSearch?: boolean
  searchLoading?: boolean
  onSearch?: (value: string) => void
  searchPlaceholder?: string
  pagination?: PaginationConfig
  children?: ReactNode
  className?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div:last-child {
    flex-grow: 1;

    .ant-spin-nested-loading,
    .ant-spin-container,
    .ant-table-wrapper {
      height: 100%;
    }

    .ant-table {
      height: calc(100% - ${grid(16)});
    }
  }
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${grid(3)};

  > span {
    max-width: 1200px;
  }
`

const PaginationNav = styled(Pagination)`
  padding: ${grid(4)} 0;
  text-align: right;
`

const Table = (props: TableProps): ReactNode => {
  const {
    className,
    children,
    loading = false,
    showSearch = false,
    searchLoading = false,
    onSearch = noop,
    searchPlaceholder,
    dataSource,
    pagination,
    ...rest
  } = props

  const paginationObj = useMemo(
    () => ({
      current: 1,
      pageSize: 10,
      ...pagination,
    }),
    [pagination],
  )

  const [paginationCurrent, setPaginationCurrent] = useState(
    paginationObj.current,
  )

  const [paginationSize, setPaginationSize] = useState(paginationObj.pageSize)

  useEffect(() => {
    setPaginationCurrent(paginationObj.current)
    setPaginationSize(paginationObj.pageSize)
  }, [paginationObj])

  const passedPagination = {
    ...paginationObj,
    current: paginationCurrent,
    pageSize: paginationSize,
  }

  const triggerPaginationEvent =
    (eventName: 'onChange' | 'onShowSizeChange') =>
    (page: number, pageSize: number): void => {
      setPaginationCurrent(page)
      setPaginationSize(pageSize)

      if (pagination && pagination[eventName]) {
        pagination[eventName](page, pageSize)
      }
    }

  const onPaginationChange = triggerPaginationEvent('onChange')

  const onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange')

  return (
    <Wrapper className={className}>
      {showSearch && (
        <SearchWrapper>
          <Search
            loading={searchLoading}
            onSearch={onSearch}
            placeholder={searchPlaceholder}
          />
        </SearchWrapper>
      )}

      <Spin spinning={loading}>
        <AntTable {...rest} dataSource={dataSource} pagination={false}>
          {children}
        </AntTable>
      </Spin>
      {pagination && (
        <PaginationNav
          onChange={onPaginationChange}
          onShowSizeChange={onPaginationShowSizeChange}
          pagination={passedPagination}
        />
      )}
    </Wrapper>
  )
}

export default Table
