import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
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
  }[],
  nextPage: string
}

const Home: NextPage<HomeProps> = ({ results, nextPage }) => {

  const [posts, setPosts] = useState<HomeProps>({ results, nextPage })

  function handleNextPage() {
    if (posts.nextPage) {
      fetch(posts.nextPage)
        .then(response => response.json())
        .then(data => {
          const results = data.results.map((post: any) => {
            return {
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
          })

          const newPosts = [...posts.results]

          results.map((post: any) => newPosts.push(post))

          setPosts({ results: newPosts, nextPage: data.next_page })

        })
    }

  }

  return (
    <div>
      <Head>
        <title>TecNews LFS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <ul>
          {posts.results.map(post => (
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

        {posts.nextPage && (
          <button onClick={handleNextPage}>Carregar mais posts...</button>
        )}
      </main>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  const page = await client.getByType('post', {
    pageSize: 2
  })

  const results = page.results.map(post => {
    return {
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
  })

  return {
    props: {
      results,
      nextPage: page.next_page ? page.next_page : ''
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}