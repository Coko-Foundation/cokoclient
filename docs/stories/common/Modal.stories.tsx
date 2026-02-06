/* eslint-disable no-alert */

import React, { ReactNode, useState } from 'react'
import { Modal, Button } from '../../../src/ui'

export const Base = (): ReactNode => {
  const [showModal, setShowModal] = useState(false)

  const handleOk = (): void => {
    alert('Clicked ok!')
    setShowModal(false)
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
      <Modal
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
        open={showModal} // change 'visible' to 'open' 'cause 'visible' is deprecated
      >
        <p>This is a modal</p>
      </Modal>
    </>
  )
}

export const AntModalHooks = (): ReactNode => {
  const ModalContext = React.createContext(null)

  const [modal, contextHolder] = Modal.useModal()
  const { info, confirm, error, success } = modal
  const ModalFooter = Modal.footer

  const infoDialog = (): void => {
    info({
      title: 'Info dialog',
      content: <p>Some important information</p>,
    })
  }

  const confirmationDialog = (): void => {
    confirm({
      title: 'Confirmation dialog',
      content: <p>Are you sure you want to do this?</p>,
    })
  }

  const errorDialog = (): void => {
    error({
      title: 'Error dialog',
      content: <p>There was an error while performing the action</p>,
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => modal.info().destroy()}>Nevermind</Button>{' '}
          <Button onClick={() => modal.error().destroy()} type="primary">
            Try again
          </Button>{' '}
        </ModalFooter>,
      ],
      maskClosable: true,
    })
  }

  const successDialog = (): void => {
    success({
      title: 'Success dialog',
      content: <p>Your request was successfull!</p>,
    })
  }

  return (
    <ModalContext.Provider value={null}>
      <Button onClick={infoDialog}>Info</Button>{' '}
      <Button onClick={confirmationDialog}>Confirm</Button>{' '}
      <Button onClick={errorDialog}>Error (custom footer)</Button>{' '}
      <Button onClick={successDialog}>Success</Button>
      {contextHolder}
    </ModalContext.Provider>
  )
}
