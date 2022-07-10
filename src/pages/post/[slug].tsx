import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { createClient } from "../../services/prismicio"

import styles from './styles.module.scss'

interface PostProps {
  results: {
    id: string;
    uid: string;
    createdAt: string;
    data: {
      title: string;
      contentPreview: string;
      author: string;
      banner: string;
      content: {
        subtitle: string;
        paragraph: string;
      }[]
    }
  }[]
}

export default function Post({ results }: PostProps) {
  return (
    <>
      <Head>
        <title>{results[0].data.title}</title>
      </Head>
      <main>
        {results.map(post => (
          <div className={styles.container}>
            <img src={post.data.banner} alt="Banner do post" />

            <h1>{post.data.title}</h1>
            <span>{post.data.author}</span>
            <span>{post.createdAt}</span>

            <section>
              {post.data.content.map(content => (
                <>
                  {content.subtitle && <h2>{content.subtitle}</h2>}
                  <p>{content.paragraph}</p>
                </>
              ))}
            </section>
            
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
      createdAt: post.first_publication_date,
      data: {
        title: post.data.title[0].text,
        contentPreview: post.data.content[0].paragraph[0].text.substring(0, 200),
        author: post.data.author[0].text,
        banner: post.data.banner.url,
        content: post.data.content.map((content: any) => {
          return {
            subtitle: content.subtitle[0] ? content.subtitle[0].text : '',
            paragraph: content.paragraph[0].text
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