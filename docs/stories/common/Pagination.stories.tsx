import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'
import { Pagination } from '../../../src/ui'

export const Base = (): ReactNode => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      onChange={setCurrentPage}
      pagination={{ total: 31, current: currentPage }}
    />
  )
}

export const ControlPage = (): ReactNode => {
  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <>
      <p>Page {currentPage}</p>
      <Pagination
        onChange={onPageChange}
        pagination={{ total: 31, current: currentPage }}
      />
    </>
  )
}

export const CustomRender = (): ReactNode => {
  const [currentPage, setCurrentPage] = useState(1)
  const paginationRef = useRef<HTMLElement>(null)

  const paginationLinkClick = (e: React.MouseEvent): void => {
    e.preventDefault()
  }

  const paginationKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      const parentNode = e.currentTarget.parentNode as HTMLElement
      parentNode?.click()
    }
  }

  const itemRender = (
    page: number,
    type: string,
    originalElement: ReactNode,
  ): ReactNode => {
    if (type === 'next') {
      return (
        <CaretRightOutlined
          style={{ color: 'red', display: 'flex', fontSize: '31px' }}
          tabIndex={0}
        />
      )
    }

    if (type === 'prev') {
      return (
        <CaretLeftOutlined
          style={{ color: 'green', display: 'flex', fontSize: '31px' }}
          tabIndex={0}
        />
      )
    }

    if (type === 'jump-next' || type === 'jump-prev') {
      return originalElement
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
  }

  useEffect(() => {
    if (paginationRef.current) {
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
  }, [currentPage])

  return (
    <>
      <Pagination
        onChange={setCurrentPage}
        pagination={{ total: 31, current: currentPage, itemRender }}
        ref={paginationRef}
      />
      <br />
      <aside>
        <p>
          Beware: applying a custom render for the pagination will break the
          default accessibility settings, so make sure you implement it
          correctly. You can pass a ref to the component which will be attached
          to the pagination&apos;s <code>&lt;nav&gt;</code> wraper, and you can
          use it to make the accessibility adjustements.
        </p>
      </aside>
    </>
  )
}
