import { Github } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const GithubContributionButton = ({onSidebar}:{onSidebar?: boolean}) => {
  return (
    <Link href={"https://github.com/Raven412s/next-shadcn-starter-kit"} className={cn(buttonVariants({variant:"outline", size:"icon-sm" }), "rounded-full", onSidebar ? "":"size-10")} target='_blank'>
      <Github className='size-4 hover:scale-110 fill-foreground text-foreground' />
    </Link>
  )
}

export default GithubContributionButton
