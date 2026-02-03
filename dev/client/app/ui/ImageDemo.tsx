import { ReactNode } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import Container from './common/Container'

const ImageContainer = styled.div`
  height: 300px;

  img {
    height: 100%;
  }
`

const ImageDemo = (): ReactNode => (
  <Container $second>
    <div>
      <Link to="/">Go back</Link>
    </div>

    <ImageContainer>
      <img alt="a bird" src="sample-image.jpg" />
    </ImageContainer>
  </Container>
)

export default ImageDemo
