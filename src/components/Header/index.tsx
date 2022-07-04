import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <Link href='/'>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="Logo" />
          <div>
            TecNews LFS
          </div>
        </div>
      </Link>
    </header>
  )
}