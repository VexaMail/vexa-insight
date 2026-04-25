import { extractXmlFromZipImpl } from './extractXmlFromZipImpl'

export function extractXmlFromZip(fileContent: Buffer): Promise<Buffer | null> {
  return new Promise((resolve, reject) => {
    extractXmlFromZipImpl(fileContent, resolve, reject)
  })
}
