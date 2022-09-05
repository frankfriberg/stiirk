import tw from 'tailwind-styled-components'

export const ModalOverlay = tw.div`
  absolute
  top-0
  w-screen
  h-screen
  backdrop-blur-sm
  bg-black/20
`

export const ModalContent = tw.div`
  p-10
  fixed
  w-full
  rounded-t-lg
  bottom-0
  bg-white
`
