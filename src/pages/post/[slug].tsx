import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { createClient } from "../../services/prismicio"

import format from "date-fns/format"

import { FiUser, FiCalendar } from 'react-icons/fi'
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
        paragraphs: {
          paragraph: string
        }[];
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
          <>
            <img src={post.data.banner} alt="Banner do post" className={styles.banner} />
            <div className={styles.container}>
              <h1>{post.data.title}</h1>

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
                  <>
                    {content.subtitle && <h2>{content.subtitle}</h2>}
                    {content.paragraphs.map(paragraphs => <p>{paragraphs.paragraph}</p>)}
                  </>
                ))}
              </section>

            </div>
          </>
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
        title: post.data.title[0].text,
        contentPreview: post.data.content[0].paragraph[0].text.substring(0, 200),
        author: post.data.author[0].text,
        banner: post.data.banner.url,
        content: post.data.content.map((content: any) => {
          return {
            subtitle: content.subtitle[0] ? content.subtitle[0].text : '',
            paragraphs: content.paragraph.map((paragraph: any) => {
              return {
                paragraph: paragraph.text
              }
            })
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