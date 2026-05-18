export function sameOriginRejection(): {
  status: 403
  error: { code: string; message: string }
} {
  return {
    status: 403,
    error: {
      code: 'CSRF_REJECTED',
      message:
        'Cross-origin or missing-origin request rejected for mutating endpoint',
    },
  }
}
