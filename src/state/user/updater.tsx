import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../index'
import { updateMatchesDarkMode } from './actions'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()

  // keep dark mode in sync with the system
  useEffect(() => {
    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')
    dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))

    if (match?.addListener) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      match?.addListener(darkHandler)
    } else if (match?.addEventListener) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      match?.addEventListener('change', darkHandler)
    }

    return () => {
      if (match?.removeListener) {
        return match?.removeListener(darkHandler)
      } else if (match?.removeEventListener) {
        return match?.removeEventListener('change', darkHandler)
      }
    }
  }, [dispatch])

  return null
}
