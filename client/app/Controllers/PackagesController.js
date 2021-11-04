import { ProxyState } from '../AppState.js'
import { packagesService } from '../Services/PackagesService.js'
import { logger } from '../utils/Logger.js'

function _draw() {
  const packages = ProxyState.packages
  let template = ''
  packages.forEach(p => { template += p.Template })
  // logger.log('[Drawing tmeplate]', template)
  document.getElementById('manifest').innerHTML = template
}
export class PackagesController {
  constructor() {
    ProxyState.on('packages', _draw)
    // FIXME find a way to search un-assigned packages
    // NOTE created special route in server with endpoint api/packages/unassigned that would return all unassigned
    this.getPackages('/unassigned')
  }

  async getPackages(query) {
    try {
      packagesService.getPackages(query)
    } catch (error) {
      logger.error(error)
    }
  }

  async assignPackage(packageId, shipId) {
    try {
      logger.log('assigning package', packageId, 'to ship', shipId)
      packagesService.assignPackage(packageId, shipId)
    } catch (error) {
      logger.error(error)
    }
  }
}
