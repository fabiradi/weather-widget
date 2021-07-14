import styled from 'styled-components/macro'

const Wrapper = styled.div<{ size: number }>`
  font-size: 85%;
  text-align: center;
  width: ${({ size }) => size}px;
  hyphens: auto;
`

const Image = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  background: #ccc;
  border-radius: ${({ size }) => size / 10}px;
`

const Description = styled.div<{ size: number }>`
  opacity: 0.5;
  font-size: ${({ size }) => (size / 75) * 1.25 * 100}%;
`

export { Wrapper, Image, Description }
