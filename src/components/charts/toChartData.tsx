import type { SpfDkimChartProps } from '@/types/charts'

export function toChartData(d: SpfDkimChartProps['data']) {
  return [
    { name: 'SPF Pass', count: d.spfPass, gradient: 'url(#gradSpfPass)' },
    { name: 'SPF Fail', count: d.spfFail, gradient: 'url(#gradSpfFail)' },
    { name: 'DKIM Pass', count: d.dkimPass, gradient: 'url(#gradDkimPass)' },
    { name: 'DKIM Fail', count: d.dkimFail, gradient: 'url(#gradDkimFail)' },
  ]
}
