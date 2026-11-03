import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Topic } from '@/data/content'

interface TopicCardProps {
  topic: Topic
  className?: string
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, className = '' }) => {
  return (
    <Link
      to={`/guides?topic=${topic.slug}`}
      className={`group bg-white rounded-2xl border border-[#E5E0D6] overflow-hidden flex flex-col p-6 sm:p-7 card-lift hover:border-[#8FA88F] transition-all relative ${className}`}
    >
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-5">
        <img
          src={topic.image}
          alt={topic.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#2F5233]/10 group-hover:bg-[#F3C9A8]/20 transition-colors" />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
            Topic
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26] group-hover:text-[#2F5233] transition-colors">
            {topic.name}
          </h3>
          <p className="text-sm text-[#6B6B60] leading-relaxed">{topic.description}</p>
        </div>

        <div className="pt-2 flex items-center text-sm font-semibold text-[#2F5233] group-hover:text-[#24402A]">
          <span>Browse guides</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
