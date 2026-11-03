import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { EXACT_AFFILIATE_DISCLOSURE } from '@/data/content'

interface AffiliateDisclosureCalloutProps {
  className?: string
  compact?: boolean
}

export const AffiliateDisclosureCallout: React.FC<AffiliateDisclosureCalloutProps> = ({
  className = '',
  compact = false,
}) => {
  return (
    <aside
      aria-label="Affiliate Disclosure"
      className={`border border-[#E5E0D6] bg-[#FAF7F2] rounded-xl text-[#2B2B26] ${
        compact ? 'p-3 text-xs' : 'p-4 sm:p-5 text-sm'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#2F5233] mt-0.5 shrink-0" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold text-xs tracking-wider uppercase text-[#2F5233]">
            Affiliate Disclosure
          </p>
          <p className="text-[#2B2B26] leading-relaxed">{EXACT_AFFILIATE_DISCLOSURE}</p>
        </div>
      </div>
    </aside>
  )
}
