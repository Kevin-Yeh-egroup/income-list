'use client'

import { Analytics } from '@vercel/analytics/next'

export function AnalyticsWrapper() {
  // 只在生產環境且客戶端渲染時載入
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return <Analytics />
}

