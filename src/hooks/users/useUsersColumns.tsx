import type {
  UseUsersColumnsParams,
  UseUsersColumnsReturn,
} from '@/types/users'
import { Shield, ShieldAlert, UserIcon } from 'lucide-react'

export function useUsersColumns({
  currentUserId,
  onEdit,
  onDelete,
}: UseUsersColumnsParams): UseUsersColumnsReturn {
  return [
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserIcon className="text-muted-foreground h-4 w-4" />
          <span className="font-medium">{row.original.username}</span>
          {row.original.id === currentUserId && (
            <span className="bg-primary/20 text-primary ml-2 rounded-full px-2 py-0.5 text-[10px]">
              You
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span className="flex items-center gap-1.5 text-xs">
          {row.original.role === 'admin' ? (
            <ShieldAlert className="text-warning h-4 w-4" />
          ) : (
            <Shield className="text-muted-foreground h-4 w-4" />
          )}
          {row.original.role.toUpperCase()}
        </span>
      ),
    },
    {
      accessorKey: 'allowedDomains',
      header: 'Domains Access',
      cell: ({ row }) => {
        if (!row.original.allowedDomains) {
          return (
            <span className="text-muted-foreground text-xs italic">
              All Domains
            </span>
          )
        }
        try {
          const domains = JSON.parse(row.original.allowedDomains)
          if (!Array.isArray(domains) || domains.length === 0) {
            return (
              <span className="text-muted-foreground text-xs italic">
                All Domains
              </span>
            )
          }
          return <span className="text-xs">{domains.join(', ')}</span>
        } catch {
          return <span className="text-xs">{row.original.allowedDomains}</span>
        }
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors"
            type="button"
            onClick={() => {
              onEdit(row.original)
            }}
          >
            Edit
          </button>
          <button
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
            type="button"
            disabled={row.original.id === currentUserId}
            onClick={() => {
              void onDelete(row.original.id)
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]
}
