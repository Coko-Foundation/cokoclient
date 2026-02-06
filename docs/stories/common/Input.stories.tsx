/* eslint-disable no-console */

import { ReactNode } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

// import { Formik } from 'formik'
// import { Form } from 'formik-antd'

import { Input } from '../../../src/ui'

const Wrapper = styled.div`
  width: 300px;
`

export const Base = (): ReactNode => (
  <Wrapper>
    <Input onChange={v => console.log(v)} placeholder={faker.lorem.words(4)} />
  </Wrapper>
)

// export const Base = () => (
//   <Wrapper>
//     {/* <Formik> */}
//     {/* <Form layout="vertical"> */}
//     <Input
//       name="test"
//       onChange={v => console.log(v)}
//       placeholder={lorem.words(4)}
//     />
//     {/* </Form> */}
//     {/* </Formik> */}
//   </Wrapper>
// )

export const Disabled = (): ReactNode => (
  <Wrapper>
    <Input
      disabled
      onChange={v => console.log(v)}
      placeholder={faker.lorem.words(4)}
    />
  </Wrapper>
)

export const PasswordType = (): ReactNode => (
  <Wrapper>
    <Input
      onChange={v => console.log(v)}
      placeholder={faker.lorem.words(4)}
      type="password"
    />
  </Wrapper>
)
