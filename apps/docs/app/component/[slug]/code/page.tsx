import { notFound } from 'next/navigation'
import { allComponents } from 'content'
import { Mdx } from 'core/mdx'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return allComponents.map((component) => ({
    slug: component.url_path.replace('/component/', ''),
  }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params

  const component = allComponents.find(
    (component) => component.url_path === '/component/' + slug,
  )

  if (!component) {
    notFound()
  }

  return {
    title: 'Code - ' + component.title + ' — Green Design System',
    description: component.summary,
  }
}

export default function Code({ params }: { params: { slug: string } }) {
  const { slug } = params

  const component = allComponents.find(
    (component) => component.url_path === '/component/' + slug + '/code',
  )

  if (!component) {
    notFound()
  }

  const { body } = component

  return <Mdx code={body.code} globals={{}} />
}
