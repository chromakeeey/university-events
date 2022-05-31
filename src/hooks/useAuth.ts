import { auth } from 'api'
import { createUser, getUser } from 'api/auth'
import { useEffect } from 'react'
import useStores from 'stores'
import { User } from 'Users'

const useAuth = () => {
  const { userStore } = useStores()

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        userStore.setUser(null)
        userStore.setLoading(false)

        return
      }

      const authUser = await getUser(user.uid)

      if (!authUser) {
        const toCreateUser: User = {
          id: user.uid,
          email: user.email ?? 'random@gmail.com',
          role: 'DEFAULT',
        }

        await createUser(toCreateUser)
        userStore.setUser(toCreateUser)

        return
      }

      userStore.setUser(authUser)
      userStore.setLoading(false)
    })

    auth.useDeviceLanguage()
  }, [])
}

export default useAuth
