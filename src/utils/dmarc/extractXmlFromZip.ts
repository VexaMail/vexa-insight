import { extractXmlFromZipImpl } from './extractXmlFromZipImpl'

export async function extractXmlFromZip(
  fileContent: Buffer,
): Promise<Buffer | null> {
  return extractXmlFromZipImpl(fileContent)
}
