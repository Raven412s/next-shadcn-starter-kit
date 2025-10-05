import { Github } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const GithubContributionButton = () => {
  return (
    <Link href={"https://github.com/Raven412s/next-shadcn-starter-kit"} className={cn(buttonVariants({variant:"outline", size:"icon" }), "rounded-full size-10")} target='_blank'>
      <Github className='size-6 hover:scale-110 fill-foreground' />
    </Link>
  )
}

export default GithubContributionButton
