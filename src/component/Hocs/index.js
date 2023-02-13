import {Component} from 'react'
import Header from '../Header'

function withHeader(WrapperComponent) {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <WrapperComponent {...this.props} />
        </>
      )
    }
  }
}

export default withHeader
