/* stylelint-disable indentation */
/* stylelint-disable selector-combinator-space-before */
/* stylelint-disable selector-descendant-combinator-no-non-space */
/* stylelint-disable string-quotes */
import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { Select as AntSelect } from 'antd'

import { th, type ThemeValue } from '../../toolkit'
import { debounce as debounceFunc } from '../../toolkit/funcs'
import Empty from './Empty'

type SelectProps = ComponentProps<typeof AntSelect> & {
  async?: boolean
  debounceTimeout?: number
  isOpen?: boolean
  wrapOptionText?: boolean
}

const SelectWrapper = styled.span``

const StyledSelect = styled(AntSelect)`
  width: 100%;

  &.ant-select-focused {
    outline: ${(props): string => `${props.theme.lineWidth * 4}`}px solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }

  .ant-select-arrow {
    color: ${th('colorBorder')};
  }

  &.ant-select.ant-select-disabled > .ant-select-selector,
  &.ant-select-multiple.ant-select-disabled
    > .ant-select-selector
    .ant-select-selection-item-content {
    background-color: ${th('colorBackgroundHue')};
    color: ${(props): string => `${props.theme.colorText}cc`};
  }
`

const StyledDropdown = styled.div<{ $wrapOptionText: boolean }>`
  .ant-select-item-option-active {
    background-color: ${th('colorBackgroundHue')};
    outline: 2px solid ${th('colorPrimary')};
    outline-offset: -2px;

    &.ant-select-item-option-selected[role='option'][aria-selected='true'] {
      text-decoration: underline;
    }
  }

  .ant-select-item-option-selected[role='option'][aria-selected='true'] {
    background-color: ${th('colorPrimary')};
    color: ${th('colorTextReverse')};

    .ant-select-item-option-state {
      color: ${th('colorTextReverse')};
    }
  }

  .ant-select-item-option-content {
    /* outline: 2px solid ${th('colorPrimary')}; */
    ${(props): ThemeValue =>
      props.$wrapOptionText &&
      css`
        white-space: normal;
      `}
  }
`

const defaultNotFoundContent = (
  <span role="status">
    <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </span>
)

type AriaAttributes = Record<string, string | null> | null

const Select = (props: SelectProps): React.ReactNode => {
  const {
    async = false,
    className,
    debounceTimeout = 500,
    filterOption,
    notFoundContent = defaultNotFoundContent,
    onSearch,
    showSearch,
    id,
    isOpen = false,
    virtual = false,
    wrapOptionText = false,
    ...rest
  } = props

  const selectRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(isOpen)
  const [ariaAttributes, setAriaAttributes] = useState<AriaAttributes>({})

  const cleanUpInvalidAttrs = (): void => {
    const input = selectRef.current?.querySelector('input[role="combobox"]')
    if (!input) return

    // store invalid attrs in local state
    setAriaAttributes({
      'aria-controls': input.getAttribute('aria-controls'),
      'aria-owns': input.getAttribute('aria-owns'),
      'aria-activedescendant': input.getAttribute('aria-activedescendant'),
    })
    // remove them from the DOM node
    input.removeAttribute('aria-controls')
    input.removeAttribute('aria-owns')
    input.removeAttribute('aria-activedescendant')
  }

  useEffect(() => {
    const innerWrapper = selectRef.current?.querySelector('.ant-select')
    innerWrapper?.removeAttribute('aria-required')

    // hack to fix accessibility errors
    // apply with delay to make sure attrs are already there
    setTimeout(() => {
      cleanUpInvalidAttrs()
    }, 500)
  }, [])

  useEffect(() => {
    if (open && ariaAttributes) {
      const input = selectRef.current?.querySelector('input[role="combobox"]')
      if (!input) return

      // reapply the stored aria attributes after opening input for the first time
      Object.keys(ariaAttributes).forEach(attr => {
        const value = ariaAttributes[attr]
        if (value) {
          input.setAttribute(attr, value)
        }
      })

      setAriaAttributes(null)
    }
  }, [open])

  const handleSearch = (searchValue: string): void => {
    onSearch?.(searchValue)
  }

  const searchFunc = async
    ? debounceFunc(handleSearch, debounceTimeout)
    : handleSearch

  const customDropdownRender = (
    menu: React.ReactElement,
  ): React.ReactElement => (
    <StyledDropdown
      $wrapOptionText={wrapOptionText}
      data-testid="select-dropdown"
    >
      {menu}
    </StyledDropdown>
  )

  return (
    <SelectWrapper className={className} ref={selectRef}>
      <StyledSelect
        filterOption={async && !filterOption ? false : filterOption}
        id={id}
        notFoundContent={!notFoundContent && async ? null : notFoundContent}
        onOpenChange={o => setOpen(o)}
        onSearch={onSearch && searchFunc}
        open={open}
        popupRender={customDropdownRender}
        showSearch={showSearch || !!onSearch}
        virtual={virtual}
        {...rest}
      />
    </SelectWrapper>
  )
}

export default Select
