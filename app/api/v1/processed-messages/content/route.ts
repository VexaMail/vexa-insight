import { withApiAuth } from '@/services/api'
import { getProcessedMessageContent } from '@/services/processed-messages'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('messageId')

    if (!messageId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Missing messageId' } },
        { status: 400 },
      )
    }

    try {
      const rawXml = await getProcessedMessageContent(messageId)
      if (!rawXml) {
        return NextResponse.json(
          {
            error: {
              code: 'NOT_FOUND',
              message:
                'Content not found or processed before file storage update.',
            },
          },
          { status: 404 },
        )
      }

      return NextResponse.json({ data: { rawXml } })
    } catch (error) {
      console.error('Error fetching processed message content:', error)
      return NextResponse.json(
        {
          error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch content' },
        },
        { status: 500 },
      )
    }
  },
)
