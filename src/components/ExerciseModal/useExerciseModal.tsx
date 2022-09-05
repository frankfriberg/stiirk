import { useState } from 'react'

const useModal = () => {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false)
  const toggleModal = () => setModalIsShown(!modalIsShown)

  return {
    modalIsShown,
    toggleModal,
  }
}

export default useModal
