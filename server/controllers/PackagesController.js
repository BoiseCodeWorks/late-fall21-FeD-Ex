import { packagesService } from '../services/PackagesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

// TODO Write the Controller
export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .post('', this.create)
      .get('', this.getAll)
      .put('/:id', this.edit)
      .delete('/:id', this.deliver)
  }

  async create(req, res, next) {
    try {
      const newPackage = await packagesService.create(req.body)
      return res.send(newPackage)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      logger.log('your query sir', query)
      const packages = await packagesService.getAll(query)
      return res.send(packages)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const id = req.params.id
      const updateData = req.body
      // next line not necessary but can be useful
      updateData._id = id
      // NOTE makes sure cannot edit delivered property from this route
      delete updateData.delivered
      const updatedPackage = await packagesService.edit(id, updateData)
      return res.send(updatedPackage)
    } catch (error) {
      next(error)
    }
  }

  // NOTE delivering packages can ONLY be done through this 'special' route
  async deliver(req, res, next) {
    try {
      const id = req.params.id
      // We already have a method to edit the package, we are just editing this one property though
      const deliveredPackage = await packagesService.edit(id, { delivered: true })
      return res.send(deliveredPackage)
    } catch (error) {
      next(error)
    }
  }
}
