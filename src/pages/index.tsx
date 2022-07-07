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
    <div className={styles.container}>
      <Head>
        <title>TecNews LFS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {results.map(post => (
            <li className={styles.post} key={post.id}>
              <img src={post.data.banner} alt="Banner do post" />
              <div>
                <Link href='/'>
                  <h1>{post.data.title}</h1>
                </Link>
                <p>{post.data.contentPreview}...</p>
              </div>
            </li>
          ))}

          {/* <li className={styles.post}>
            <img src="https://pbs.twimg.com/profile_images/1004666132253507584/gTEhhS7D_400x400.jpg" alt="" />
            <div>
              <Link href='/'>
                <h1>Descoberta comunidade de hackers formada por adolescentes</h1>
              </Link>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque natus perferendis beatae? Harum aperiam libero explicabo placeat nobis obcaecati sunt recusandae, labore similique, quis eum quam mollitia. Nisi, quidem totam.</p>
            </div>
          </li> */}

          {/* <li className={styles.post}>
            <img src="https://ichef.bbci.co.uk/news/640/cpsprodpb/133CB/production/_103759787_gettyimages-949493748.jpg" alt="" />
            <div>
              <Link href='/'>
                <h1>Descoberta comunidade de hackers formada por adolescentes</h1>
              </Link>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque natus perferendis beatae? Harum aperiam libero explicabo placeat nobis obcaecati sunt recusandae, labore similique, quis eum quam mollitia. Nisi, quidem totam.</p>
            </div>
          </li>

          <li className={styles.post}>
            <img src="https://upload.wikimedia.org/wikipedia/pt/9/9f/RedeTV_News.jpg" alt="" />
            <div>
              <Link href='/'>
                <h1>Descoberta comunidade de hackers formada por adolescentes</h1>
              </Link>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque natus perferendis beatae? Harum aperiam libero explicabo placeat nobis obcaecati sunt recusandae, labore similique, quis eum quam mollitia. Nisi, quidem totam.</p>
            </div>
          </li>

          <li className={styles.post}>
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-poster-design-template-d020bd02f944a333be71e17e3a38db24_screen.jpg" alt="" />
            <div>
              <Link href='/'>
                <h1>Descoberta comunidade de hackers formada por adolescentes</h1>
              </Link>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque natus perferendis beatae? Harum aperiam libero explicabo placeat nobis obcaecati sunt recusandae, labore similique, quis eum quam mollitia. Nisi, quidem totam.</p>
            </div>
          </li> */}
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