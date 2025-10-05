/** biome-ignore-all lint/suspicious/noArrayIndexKey: explanation */
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { sections } from '@/data/sections'


const DocsSidebar = () => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname === path || pathname.endsWith(`${path} + /`)
    }

    return (
        <Sidebar className='mt-16'>
            <SidebarContent>
                {sections.map((section, index) => (
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item, idx) => (
                                    <SidebarMenuItem key={idx}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive(item.url)}
                                            className={cn(
                                                "transition-colors duration-200",
                                                isActive(item.url)
                                                    ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            )}
                                        >
                                            <Link href={item.url}>
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}

export default DocsSidebar