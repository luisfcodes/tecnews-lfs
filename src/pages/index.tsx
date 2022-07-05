import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TecNews LFS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          <li className={styles.post}>
            <img src="https://pbs.twimg.com/profile_images/1004666132253507584/gTEhhS7D_400x400.jpg" alt="" />
            <div>
              <Link href='/'>
                <h1>Descoberta comunidade de hackers formada por adolescentes</h1>
              </Link>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque natus perferendis beatae? Harum aperiam libero explicabo placeat nobis obcaecati sunt recusandae, labore similique, quis eum quam mollitia. Nisi, quidem totam.</p>
            </div>
          </li>

          <li className={styles.post}>
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
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Home