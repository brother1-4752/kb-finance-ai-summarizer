import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TempBody>
      <LayoutContainer>{children}</LayoutContainer>
    </TempBody>
  )
}

export default Layout

const TempBody = styled.div`
  background: white;
`

const LayoutContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
