import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

// TODO Write the Service
class PackagesService {
  async create(newPackageData) {
    const newPackage = await dbContext.Packages.create(newPackageData)
    return newPackage
  }

  async getAll(query = {}) {
    const packages = await dbContext.Packages.find(query).populate('ship', 'captain name')
    return packages
  }

  async edit(id, updateData) {
    // NOTE Get the package first, to make sure the id passed is good
    const originalPackage = await dbContext.Packages.findById(id)
    if (!originalPackage) {
      throw new BadRequest('that package is not here')
    }
    // NOTE check if package has already been delivered, we don't want edits to happen after this
    if (originalPackage.delivered) {
      throw new Forbidden("That package has already been delivered! you can't edit it now! it's too late!")
    }
    // NOTE just executing the edit as normal, nothing different here
    const updatedPackage = await dbContext.Packages.findByIdAndUpdate(id, updateData, { new: true })
    return updatedPackage
  }
}
export const packagesService = new PackagesService()
