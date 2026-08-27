export const dataFromProps = (passed: number, failed: number) => [
  { name: 'Pass', count: passed, gradient: 'url(#gradientPass)' },
  { name: 'Fail', count: failed, gradient: 'url(#gradientFail)' },
]
