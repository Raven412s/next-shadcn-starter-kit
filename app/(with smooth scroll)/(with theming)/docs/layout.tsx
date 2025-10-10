// app/(with smooth scroll)/(with theming)/docs/layout.tsx

import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type React from 'react'
import SidebarActionBlock from '@/components/blocks/SidebarActionBlock'
import Navbar from '@/components/layout/Navbar'
import { source } from '@/lib/source'

const DocsPageLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <DocsLayout tree={source.pageTree}
            themeSwitch={{
                enabled:false
            }}

            sidebar={{
                footer: <SidebarActionBlock/>,
                className: "bg-sidebar muted-scrollbar",
                collapsible:false
            }}

            nav={{
                title: <p className='text-2xl font-semibold text-sidebar-primary'>Starter Kit</p>,
            }}

            searchToggle={{
                enabled: false,
            }}
        >
            <main className='relative w-full min-h-screen'>
            <Navbar className='lg:w-[84.7%] right-0' />
            {children}
            </main>
        </DocsLayout>
    )
}

export default DocsPageLayout
