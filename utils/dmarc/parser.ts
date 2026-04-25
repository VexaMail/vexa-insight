import { XMLParser } from 'fast-xml-parser'

export const parser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
  trimValues: true,
})
