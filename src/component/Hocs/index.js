import Header from '../Header'

function withHeader(WrapperComponent) {
  return props => (
    <>
      <Header />
      <WrapperComponent {...props} />
    </>
  )
}

export default withHeader
