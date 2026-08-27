export const PROGRESS_MAP: Array<{
  pattern: RegExp
  step: string
  progress: number
}> = [
  {
    pattern: /Checking.*Country/i,
    step: 'Checking country database...',
    progress: 5,
  },
  {
    pattern: /Fetching.*Country|Retrieving.*Country/i,
    step: 'Downloading country database...',
    progress: 10,
  },
  {
    pattern: /Extracting.*Country/i,
    step: 'Extracting country archive...',
    progress: 25,
  },
  {
    pattern: /Processing Lookup Data/i,
    step: 'Processing country lookup data...',
    progress: 30,
  },
  {
    pattern: /Processing Data.*country|Processing Data/i,
    step: 'Processing country IP ranges...',
    progress: 35,
  },
  {
    pattern: /Checking.*City/i,
    step: 'Checking city database...',
    progress: 45,
  },
  {
    pattern: /Fetching.*City|Retrieving.*City/i,
    step: 'Downloading city database...',
    progress: 52,
  },
  {
    pattern: /Extracting.*City/i,
    step: 'Extracting city archive...',
    progress: 65,
  },
  {
    pattern: /city data processed/i,
    step: 'City names processed...',
    progress: 78,
  },
  {
    pattern: /Successfully Updated/i,
    step: 'Database updated successfully!',
    progress: 100,
  },
]
