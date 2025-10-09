//  app/(with smooth scroll)/(with theming)/docs/[[...slug]]/page.tsx

import { DocsBody, DocsDescription, DocsPage, DocsTitle,  } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/components/mdx'
import { source } from '@/lib/source'

const SlugPage = async (props: { params: Promise<{ slug?: string[] }> }) => {
    const params = await props.params
    const page = source.getPage(params.slug)

    if (!page) {
        notFound()
    }

    const MDX = page.data.body
    return (
        <main className='mt-12'>
            <DocsPage
                toc={page.data.toc}
                tableOfContent={{
                    style: 'clerk',
                    single: false,
                    
                }}
                full={false}
                breadcrumb={{
                    enabled: true,
                    unselectable: "on",

                }}
            >
                <DocsTitle>{page.data.title}</DocsTitle>
                <DocsDescription>{page.data.description}</DocsDescription>

                <DocsBody>
                    <MDX components={getMDXComponents()} />
                </DocsBody>
            </DocsPage>
        </main>
    )
}

export default SlugPage
