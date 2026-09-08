import { m as motion } from 'framer-motion'
import { ReportsFilterSelect } from './ReportsFilterSelect'
import { ReportsSearchInput } from './ReportsSearchInput'
import type { ReportsTableToolbarProps } from './ReportsTableToolbarProps'

/** Search box and organization/domain filters above the reports table. */
export function ReportsTableToolbar({
  search,
  filterOrg,
  filterDomain,
  orgOptions,
  domainOptions,
  showDomainFilter,
  dispatch,
  updateUrlParams,
}: ReportsTableToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <ReportsSearchInput
        value={search}
        onChange={(value) => {
          dispatch({ type: 'SET_SEARCH', payload: value })
        }}
      />
      <ReportsFilterSelect
        label="All Organizations"
        value={filterOrg}
        options={orgOptions}
        onChange={(value) => {
          dispatch({ type: 'SET_FILTER_ORG', payload: value })
          updateUrlParams('org', value)
        }}
      />
      {showDomainFilter ? (
        <ReportsFilterSelect
          label="All Domains"
          value={filterDomain}
          options={domainOptions}
          onChange={(value) => {
            dispatch({ type: 'SET_FILTER_DOMAIN', payload: value })
            updateUrlParams('domain', value)
          }}
        />
      ) : null}
    </motion.div>
  )
}
