import React, { useEffect, useRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import { Pagination as AntPagination } from 'antd'

import { grid, th } from '../../toolkit'
import { noop } from '../../toolkit/funcs'

type PaginationConfig = {
  current?: number
  total?: number
  pageSize?: number
  itemRender?:
    | ((
        page: number,
        type: string,
        originalElement: React.ReactNode,
      ) => React.ReactNode)
    | null
  showSizeChanger?: boolean
  onShowSizeChange?: (current: number, size: number) => void
  onChange?: (page: number, pageSize: number) => void
}

type PaginationProps = {
  pagination?: PaginationConfig
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  ref?: React.Ref<HTMLElement>
}

const PaginationNav = styled.nav`
  .ant-pagination li {
    &:focus-within {
      outline: 4px solid ${th('colorPrimary')};
      outline-offset: 1px;
      transition:
        outline-offset 0s,
        outline 0s;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    > * {
      color: ${th('colorText')};
      display: block;
      height: 100%;
      padding: 0 ${grid(1)};
      width: 100%;

      &[aria-disabled='true'] {
        color: ${(props): string => `${props.theme.colorText}77`};
        cursor: not-allowed;
      }

      &:hover {
        background-color: ${th('colorBackgroundHue')};
        transition: all 0.2s;
      }
    }
  }
`

const defaultPagination: PaginationConfig = {
  current: 1,
  pageSize: 10,
  itemRender: null,
  showSizeChanger: false,
}

const Pagination = (props: PaginationProps): React.ReactNode => {
  const {
    pagination = defaultPagination,
    onChange = noop,
    onShowSizeChange = noop,
    ref,
    ...rest
  } = props

  const { current, pageSize, total } = pagination

  const paginationRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, () => paginationRef.current as HTMLElement)

  useEffect(() => {
    // enhance accessibility of pagination, only if no custom render method was provided
    if (pagination && !pagination.itemRender && paginationRef.current) {
      paginationRef.current
        .querySelectorAll('li.ant-pagination-item')
        .forEach((page, index) => {
          const counter = index + 1
          let label = `Go to page ${counter}`
          const child = page.querySelector(':scope > *')

          if (page.classList.contains('ant-pagination-item-active')) {
            child?.setAttribute('aria-current', 'page')
            label = `Page ${counter} , Current Page`
          } else {
            child?.removeAttribute('aria-current')
          }

          child?.setAttribute('aria-label', label)
        })

      paginationRef.current
        .querySelectorAll('.ant-pagination li:not([class*="custom-icon"])')
        .forEach(item => {
          item.removeAttribute('tabindex')
          const child = item.querySelector(':scope > *')

          if (item.getAttribute('aria-disabled') === 'true') {
            child?.removeAttribute('disabled')
            child?.setAttribute('aria-disabled', 'true')
          } else {
            child?.removeAttribute('aria-disabled')
          }
        })
    }
  }, [current, pageSize, total, pagination])

  const paginationLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    e.preventDefault()
  }

  const paginationKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      ;(e.currentTarget.parentNode as HTMLElement)?.click()
    }
  }

  const itemRender =
    pagination.itemRender ||
    ((
      page: number,
      type: string,
      originalElement: React.ReactNode,
    ): React.ReactNode => {
      if (type === 'jump-next' || type === 'jump-prev') {
        return originalElement
      }

      if (type === 'prev') {
        return (
          <a
            href="/previous/page"
            onClick={paginationLinkClick}
            onKeyDown={paginationKeyDown}
          >
            Previous
          </a>
        )
      }

      if (type === 'next') {
        return (
          <a
            href="/next/page"
            onClick={paginationLinkClick}
            onKeyDown={paginationKeyDown}
          >
            Next
          </a>
        )
      }

      return (
        <a
          href={`/page/${page}`}
          onClick={paginationLinkClick}
          onKeyDown={paginationKeyDown}
        >
          {page}
        </a>
      )
    })

  return (
    <PaginationNav
      aria-label="Pagination"
      ref={paginationRef}
      role="navigation"
      {...rest}
    >
      <AntPagination
        {...pagination}
        itemRender={itemRender}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    </PaginationNav>
  )
}

export default Pagination
