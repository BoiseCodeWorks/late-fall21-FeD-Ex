import { packagesService } from '../services/PackagesService'
import BaseController from '../utils/BaseController'

// TODO Write the Controller
export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      const newPackage = await packagesService.create(req.body)
      return res.send(newPackage)
    } catch (error) {
      next(error)
    }
  }
}
