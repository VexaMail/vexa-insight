export function getPublicDmarcWalkNames(domain: string): string[] {
  const labels = domain.split('.')
  const names = [domain]
  for (
    let remaining = Math.min(labels.length - 1, 7);
    remaining >= 1;
    remaining -= 1
  )
    names.push(labels.slice(-remaining).join('.'))
  return names
}
