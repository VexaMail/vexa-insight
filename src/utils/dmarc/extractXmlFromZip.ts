import { extractXmlFromZipImpl } from './extractXmlFromZipImpl'

export function extractXmlFromZip(fileContent: Buffer): Promise<Buffer | null> {
  return extractXmlFromZipImpl(fileContent)
}
