import { ProxyState } from '../AppState.js'
import { shipsService } from '../Services/ShipsService.js'
import { logger } from '../Utils/Logger.js'

function _drawShips() {
  const shipElem = document.getElementById('ships')
  const ships = ProxyState.ships
  let template = ''
  ships.forEach(s => { template += s.ListTemplate })
  shipElem.innerHTML = template
}

function _drawActiveShip() {
  const ship = ProxyState.activeShip
  document.getElementById('ship-data').innerHTML = ship.DataTemplate
}

export class ShipsController {
  constructor() {
    ProxyState.on('ships', _drawShips)
    ProxyState.on('activeShip', _drawActiveShip)
    this.getShips()
  }

  async getShips() {
    try {
      await shipsService.getAll()
    } catch (error) {
      logger.error('[getShips]', error.message)
    }
  }

  setActive(id) {
    try {
      shipsService.setActive(id)
      bootstrap.Offcanvas.getOrCreateInstance('#ships-list').hide()
    } catch (error) {
      logger.error('[setActive]', error)
    }
  }
}
