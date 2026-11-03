import React from 'react'
import { ExternalLink, CheckCircle2, Clock } from 'lucide-react'
import { SourceItem } from '@/data/content'

interface SourceListProps {
  sources?: SourceItem[]
  className?: string
}

export const SourceList: React.FC<SourceListProps> = ({ sources, className = '' }) => {
  if (!sources || sources.length === 0) return null

  return (
    <section
      aria-labelledby="sources-heading"
      className={`border border-[#E5E0D6] bg-white rounded-2xl p-6 sm:p-8 space-y-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <h3
          id="sources-heading"
          className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]"
        >
          Sources &amp; further reading
        </h3>
      </div>
      <p className="text-sm text-[#6B6B60] leading-relaxed">
        We prioritize indexed, peer-reviewed clinical literature and governmental health resources.
        Factual claims require trustworthy sources or are withheld.
      </p>

      <ol className="divide-y divide-[#E5E0D6] list-decimal list-inside space-y-3 pt-2">
        {sources.map((src, index) => (
          <li key={src.id} className="pt-3 text-sm text-[#2B2B26] leading-relaxed">
            <span className="font-medium mr-1.5">{index + 1}.</span>
            {src.verified ? (
              <span className="inline-flex flex-wrap items-baseline gap-1.5">
                <span className="font-medium text-[#2B2B26]">{src.title}</span>
                <span className="text-[#6B6B60]">({src.publisher})</span>
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#2F5233] hover:underline font-medium ml-1"
                    aria-label={`View source: ${src.title} (opens in new tab)`}
                  >
                    View publication <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                  </a>
                ) : null}
                <span className="inline-flex items-center text-xs text-[#2F5233] bg-[#E8EFE6] px-2 py-0.5 rounded-full ml-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" aria-hidden="true" /> Verified citation
                </span>
              </span>
            ) : (
              <span className="inline-flex flex-wrap items-baseline gap-1.5 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-dashed border-amber-300">
                <span className="font-medium">{src.title}</span>
                <span className="text-amber-800">({src.publisher})</span>
                <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> Source pending verification
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
