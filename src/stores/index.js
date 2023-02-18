import JobsStore from './JobStore/index'
import LoginStore from './LoginStore/index'

const loginStore = new LoginStore()

const jobStore = new JobsStore()

export default {
  jobStore,
  loginStore,
}
