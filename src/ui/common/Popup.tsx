import React, { cloneElement, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

import { grid } from '../../toolkit'
import { uuid } from '../../index'
import cokoTheme from '../../theme'

type Position = 'block-start' | 'block-end' | 'inline-start' | 'inline-end'
type Alignment = 'start' | 'end'

type PopupProps = {
  alignment?: Alignment
  children?: React.ReactNode
  focusableContent?: string[]
  id?: string
  toggle: React.ReactElement
  position?: Position
}

type PopupContainerProps = {
  $visible: boolean
  $position: Position
  $alignment: Alignment
}

const PopupContainer = styled.div<PopupContainerProps>`
  background: ${cokoTheme.colorBackground};
  border: 1px solid ${cokoTheme.colorBorder};
  border-radius: 10px;
  display: ${({ $visible }): string => ($visible ? 'block' : 'none')};

  ${(props): string => {
    const { $position, $alignment } = props

    switch (`${$position}/${$alignment}`) {
      case 'block-start/start':
        return `inset-block-end: 100%; inset-inline-start: 0; margin-block-end: ${props.theme.gridUnit};`
      case 'block-start/end':
        return `inset-block-end: 100%; inset-inline-end: 0; margin-block-end: ${props.theme.gridUnit};`
      case 'block-end/start':
        return `inset-block-start: 100%; inset-inline-start: 0; margin-block-start: ${props.theme.gridUnit};`
      case 'block-end/end':
        return `inset-block-start: 100%; inset-inline-end: 0;  margin-block-start: ${props.theme.gridUnit};`
      case 'inline-start/start':
        return `inset-inline-end: 100%; inset-block-start: 0;  margin-inline-end: ${props.theme.gridUnit};`
      case 'inline-start/end':
        return `inset-inline-end: 100%; inset-block-end: 0; margin-inline-end: ${props.theme.gridUnit};`
      case 'inline-end/start':
        return `inset-inline-start: 100%; inset-block-start: 0;  margin-inline-start: ${props.theme.gridUnit};`
      case 'inline-end/end':
        return `inset-inline-start: 100%; inset-block-end: 0; margin-inline-start: ${props.theme.gridUnit};`
      default:
        return `inset-block-end: 100%; inset-inline-start: 0; margin-block-end: ${props.theme.gridUnit};`
    }
  }}
  padding: ${grid(5)};
  position: absolute;
  z-index: 1000;
`

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`

const defaultFocusableContent = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
]

const Popup = ({
  alignment = 'start',
  children,
  focusableContent = defaultFocusableContent,
  id = uuid(),
  toggle,
  position = 'block-start',
}: PopupProps): React.ReactNode => {
  const WrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])
  const [visible, setVisible] = useState(false)

  const onClickToggle = (): void => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible && focusableElements && focusableElements.length > 0) {
      // focusing the first focusable element of the popup
      focusableElements[0].focus()
    }
  }, [visible, focusableElements])

  useEffect(() => {
    if (popupRef.current) {
      const focusableContentSelector = focusableContent.join(', ')
      setFocusableElements(
        Array.from(
          popupRef.current.querySelectorAll<HTMLElement>(
            focusableContentSelector,
          ),
        ),
      )
    }
  }, [children, focusableContent])

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const isEscapePress = e.key === 'Escape'
    const isTabPressed = e.key === 'Tab'

    if (!isTabPressed && !isEscapePress) return

    if (isEscapePress) {
      ;(popupRef.current?.previousElementSibling as HTMLElement)?.focus()
      setVisible(false)
    }

    if (!focusableElements || focusableElements.length === 0) return

    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        e.preventDefault()
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus()
      e.preventDefault()
    }
  }

  const handleBlur = (e: React.FocusEvent): void => {
    // when clicking outside the popup wrapper close the popup
    if (!WrapperRef.current?.contains(e.relatedTarget as Node)) {
      setVisible(false)
    }
  }

  return (
    <Wrapper ref={WrapperRef}>
      {cloneElement(toggle, {
        onClick: onClickToggle,
        'aria-controls': id,
        'aria-expanded': visible,
        'aria-haspopup': 'dialog',
      } as React.HTMLAttributes<HTMLElement>)}

      <PopupContainer
        $alignment={alignment}
        $position={position}
        $visible={visible}
        id={id}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={popupRef}
        tabIndex={0}
      >
        {children}
      </PopupContainer>
    </Wrapper>
  )
}

export default Popup
