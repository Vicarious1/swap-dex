import { Web3Provider } from '@ethersproject/providers'

export default function getLibrary(provider: any): Web3Provider {
    console.log('get library')
  const library = new Web3Provider(provider)
    console.log('library', library)
  library.pollingInterval = 15000
  return library
}
