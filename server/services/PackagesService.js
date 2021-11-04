import { dbContext } from '../db/DbContext'

// TODO Write the Service
class PackagesService {
  async create(newPackageData) {
    const newPackage = await dbContext.Packages.create(newPackageData)
    return newPackage
  }
}
export const packagesService = new PackagesService()
