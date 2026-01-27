import React, { ComponentProps, ComponentType, useState } from 'react'
import styled from 'styled-components'
import { debounce } from '../../toolkit/funcs'

import { Form as AntForm, FormInstance } from 'antd'

import { grid, th } from '../../toolkit'
import UIRibbon from './Ribbon'

type FormItemProps = ComponentProps<typeof AntForm.Item> & {
  onBlur?: () => void
}

type FormProps = ComponentProps<typeof AntForm> & {
  autoSave?: boolean
  autoSaveDebounceDelay?: number
  feedbackComponent?: ComponentType<ComponentProps<typeof UIRibbon>>
  onAutoSave?: ((values: Record<string, unknown>) => void) | null
  onFinishFailed?: (data: {
    errorFields: { name: (string | number)[] }[]
  }) => void
  ribbonMessage?: string | null
  ribbonPosition?: 'top' | 'bottom'
  submissionStatus?: 'success' | 'error' | 'danger' | null
  scrollErrorIntoView?: boolean
}

type ErrorField = { name: (string | number)[] }

type ScrollAction = { el: Element; top: number; left: number }

const FormWrapper = styled.div`
  .ant-form-item-explain-error {
    color: ${th('colorError')};
  }
`

const Ribbon = styled(UIRibbon)`
  margin: ${grid(2)} ${grid(4)};
`

const FormItem = (props: FormItemProps): React.ReactNode => {
  const { children, onBlur, validateTrigger, ...rest } = props
  const [lostFocusOnce, setLostFocusOnce] = useState(false)

  /**
   * Default behaviour is that errors only appear once you have touched the
   * input and moved away from it. Once touched, validations are run on every
   * change. Submitting a form will touch all fields. Setting validateTrigger
   * in the props will override the default behaviour. All we're doing here is
   * changing the default.
   */
  const useDefaultTrigger = !validateTrigger
  const defaultTrigger = !lostFocusOnce ? 'onBlur' : 'onChange'
  const trigger = useDefaultTrigger ? defaultTrigger : validateTrigger

  const handleBlur = () => {
    if (useDefaultTrigger && !lostFocusOnce) setLostFocusOnce(true)
    onBlur?.()
  }

  return (
    <div onBlur={handleBlur}>
      <AntForm.Item validateTrigger={trigger} {...rest}>
        {children}
      </AntForm.Item>
    </div>
  )
}

const Form = (props: FormProps): React.ReactNode => {
  const {
    autoSave = false,
    autoSaveDebounceDelay = 500,
    children,
    feedbackComponent: FeedbackComponent = Ribbon,
    form: propsForm,
    onAutoSave = null,
    onValuesChange,
    onFinishFailed = () => {},
    ribbonMessage = null,
    ribbonPosition = 'top',
    submissionStatus = null,
    scrollErrorIntoView = true,
    ...rest
  } = props

  const showRibbon = !!submissionStatus && !!ribbonMessage
  const [internalForm] = AntForm.useForm()
  const form: FormInstance = propsForm || internalForm

  const runAutoSave = debounce(
    () => onAutoSave?.(form.getFieldsValue()),
    autoSaveDebounceDelay,
  )

  const handleValuesChange = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>,
  ) => {
    if (autoSave && onAutoSave) runAutoSave()
    onValuesChange?.(changedValues, allValues)
  }

  const FeedbackElement = showRibbon && (
    <FeedbackComponent
      data-testid="feedback-element"
      role="alert"
      status={submissionStatus}
    >
      {ribbonMessage}
    </FeedbackComponent>
  )

  // if form validation fails, scroll to first error field (if applicable) and focus
  const focusErrorField = (errorFields: ErrorField[]) => {
    let firstErrorField: HTMLElement | null = document.getElementById(
      errorFields[0].name.join('_'),
    )

    if (!firstErrorField) return

    // handle case when input is a radio group
    if (firstErrorField.matches('div[role="radiogroup"]')) {
      // should focus it's first radio button, since radiogroup is not focusable
      firstErrorField = firstErrorField.querySelector('input[type="radio"]')
    }

    if (!firstErrorField) return

    const fieldToFocus = firstErrorField

    // create intersection observer to to check when scroll target is in view
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries

      if (entry.isIntersecting) {
        setTimeout(() => {
          // focus element after it becomes visible
          ;(entry.target as HTMLElement).focus()
          observer.unobserve(entry.target)
        }, 100)
      }
    })

    observer.observe(fieldToFocus)

    // scroll to first error field
    form.scrollToField(errorFields[0].name, {
      // specify custom scrolling behavior
      behavior: (actions: ScrollAction[]) => {
        if (actions.length === 0) {
          // no element to scroll to, field is visible
          fieldToFocus.focus()
        } else {
          // check motion preferences; avoid scrolling if users prefers reduced motion
          const motionQuery = window.matchMedia('(prefers-reduced-motion)')
          // start observing for when field becomes visible
          observer.observe(fieldToFocus)

          const action = actions.find(el => el.top > 0)

          if (!action) return

          const { el, top, left } = action
          el.scrollTo({
            top: top - 50,
            left,
            behavior: motionQuery.matches ? 'auto' : 'smooth',
          })
        }
      },
    })
  }

  const handleFinishFailed = (data: { errorFields: ErrorField[] }) => {
    if (scrollErrorIntoView) {
      const { errorFields } = data
      focusErrorField(errorFields)
    }

    onFinishFailed?.(data)
  }

  return (
    <FormWrapper>
      {ribbonPosition === 'top' && FeedbackElement}

      <AntForm
        data-testid="form-content"
        form={form}
        onFinishFailed={handleFinishFailed}
        onValuesChange={handleValuesChange}
        {...rest}
      >
        {children}
      </AntForm>

      {ribbonPosition === 'bottom' && FeedbackElement}
    </FormWrapper>
  )
}

/* Replicate exports from https://github.com/ant-design/ant-design/blob/master/components/form/index.tsx#L24-L35 */
Form.Item = FormItem
Form.List = AntForm.List
Form.ErrorList = AntForm.ErrorList
Form.useForm = AntForm.useForm
Form.Provider = AntForm.Provider

export default Form
