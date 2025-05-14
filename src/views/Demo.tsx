import Logo from '@/assets/icons/logo.svg'
import HelloWord from '../components/HelloWord'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <h1>About</h1>
        <img src={Logo} width="100" />
        <HelloWord />
      </>
    )
  },
})
