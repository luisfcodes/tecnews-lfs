import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { createClient } from "../../services/prismicio"
import * as prismicH from '@prismicio/helpers'

import format from "date-fns/format"

import { FiUser, FiCalendar } from 'react-icons/fi'
import styles from './styles.module.scss'
import { PrismicRichText, PrismicRichTextProps, PrismicText } from "@prismicio/react"

interface PostProps {
  results: {
    id: string;
    uid: string;
    createdAt: string;
    data: {
      title: any;
      author: string;
      banner: string;
      content: {
        subtitle: [];
        paragraphs: any;
        // paragraphs: {
        //   paragraph: string;
        //   image?: string;
        //   list?: string;
        // }[];
      }[]
    }
  }[]
}

export default function Post({ results }: PostProps) {
  return (
    <>
      <Head>
        <title>{prismicH.asText(results[0].data.title)}</title>
      </Head>
      <main>
        {results.map(post => (
          <div key={post.id}>
            <img src={post.data.banner} alt="Banner do post" className={styles.banner}/>
            <div className={styles.container}>

              <PrismicRichText field={post.data.title}/>

              <div className={styles.postInformations}>
                <div>
                  <FiUser color="var(--gray-500)"/>
                  <span>{post.data.author}</span>
                </div>

                <div>
                  <FiCalendar color="var(--gray-500)"/>
                  <span>{post.createdAt}</span>
                </div>
              </div>

              <section>
                {post.data.content.map(content => (
                  <div key={prismicH.asText(content.subtitle)}>
                    {content.subtitle && <PrismicRichText field={content.subtitle}/>}
                    <PrismicRichText field={content.paragraphs} />
                  </div>
                ))}
              </section>

            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {

  const client = createClient({ previewData })
  const postUID = params?.slug?.toString()

  const post = await client.getByUID('post', postUID ? postUID : '')

  const results = [
    {
      id: post.id,
      uid: post.uid,
      createdAt: format(new Date(post.first_publication_date), 'dd/MM/yyyy'),
      data: {
        title: post.data.title,
        author: prismicH.asText(post.data.author),
        banner: post.data.banner.url,
        content: post.data.content.map((content: any) => {
          return {
            subtitle: content.subtitle[0] ? content.subtitle : '',
            paragraphs: content.paragraph
          }
        })
      }
    }
  ]

  return {
    props: {
      results
    }
  }
}