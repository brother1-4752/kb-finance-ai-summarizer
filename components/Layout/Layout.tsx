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
  background: #f2f2f2;
`

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;

  background: white;
`