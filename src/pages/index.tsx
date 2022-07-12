import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '../services/prismicio'
import styles from '../styles/Home.module.scss'

interface HomeProps {
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

const Home: NextPage<HomeProps> = ({results}) => {
  return (
    <div>
      <Head>
        <title>TecNews LFS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul className={styles.listPosts}>
          {results.map(post => (
            <li className={styles.post} key={post.id}>
              <img src={post.data.banner} alt="Banner do post" />
              <div>
                <Link href={`/post/${post.uid}`}>
                  <h1>{post.data.title}</h1>
                </Link>
                <p>{post.data.contentPreview}...</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps =  async ({ previewData }) => {
  const client = createClient({ previewData })

  const page = await client.getAllByType('post')

  const results = page.map(post => {
    return {
      id: post.id,
      uid: post.uid,
      createdAt: post.first_publication_date,
      data: {
        title: post.data.title[0].text,
        contentPreview: post.data.content[0].paragraph[0].text.substring(0,200),
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
  })

  return {
    props: {
      results
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}