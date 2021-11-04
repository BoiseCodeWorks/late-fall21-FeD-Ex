import { ProxyState } from '../AppState.js'
import { Package } from '../Models/Package.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class PackagesService {
  async getPackages(query = '') {
    const res = await api.get('api/packages' + query)
    logger.log(res.data)
    ProxyState.packages = res.data.map(p => new Package(p))
  }

  async assignPackage(packageId, shipId) {
    const res = await api.put('api/packages/' + packageId, { shipId: shipId })
    logger.log('package assigned', res.data)
    const packageIndex = ProxyState.packages.findIndex(p => p.id === packageId)
    ProxyState.packages.splice(packageIndex, 1, new Package(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.packages = ProxyState.packages
  }
}

export const packagesService = new PackagesService()
