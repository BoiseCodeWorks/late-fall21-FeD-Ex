import { dbContext } from '../db/DbContext'

// TODO Write the Service
class PackagesService {
  async create(newPackageData) {
    const newPackage = await dbContext.Packages.create(newPackageData)
    await newPackage.populate('ship', 'captain name')
    return newPackage
  }

  async getAll(query = {}) {
    const packages = await dbContext.Packages.find(query).populate('ship', 'captain name')
    return packages
    // NOTE Below is for pagenation
    // const page = query.page || 1
    // delete query.page
    // const totalPages = Math.ceil(await dbContext.Packages.count() / 5)
    // const packages = await dbContext.Packages.find(query).populate('ship', 'captain name').limit(5).skip((page - 1) * 5)
    // return { results: packages, page, totalPages }
  }

  async edit(id, update) {
    const updatedPackage = await dbContext.Packages.findByIdAndUpdate(id, update, { new: true })
    return updatedPackage
  }
}
export const packagesService = new PackagesService()
