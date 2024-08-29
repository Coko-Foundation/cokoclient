/* eslint-disable react/prop-types */

import React from 'react'
import { Form, Input, Button } from 'antd'

const Profile = props => {
  const { onSubmit } = props

  const onFinish = values => {
    const { username } = values
    onSubmit(username)
  }

  const onFinishFailed = errorInfo => {
    console.error('Username form failed:', errorInfo)
  }

  return (
    <Form
      autoComplete="off"
      labelCol={{ span: 8 }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

Profile.propTypes = {}

Profile.defaultProps = {}

export default Profile
