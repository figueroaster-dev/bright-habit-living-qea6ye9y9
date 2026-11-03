import React from 'react'
import { AlertCircle } from 'lucide-react'

interface PendingPlaceholderProps {
  fieldName: string
  hint?: string
  className?: string
}

export const PendingPlaceholder: React.FC<PendingPlaceholderProps> = ({
  fieldName,
  hint,
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label={`Pending verification for ${fieldName}`}
      className={`border-2 border-dashed border-amber-400/80 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl p-4 sm:p-5 text-amber-900 dark:text-amber-200 transition-colors ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p className="font-medium text-sm sm:text-base tracking-tight text-amber-950 dark:text-amber-100">
            Pending verification — site owner: add verified {fieldName} here
          </p>
          <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
            {hint ||
              `// EDIT ME: Replace this placeholder in src/data/content.ts once official manufacturer documentation or clinical Certificate of Analysis is available.`}
          </p>
        </div>
      </div>
    </div>
  )
}
