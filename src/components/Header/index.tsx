import Link from 'next/link'
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <div className={styles.logo}>
            <img src="/images/computer.svg" alt="Logo" />
            <div>
              TecNews LFS
            </div>
          </div>
        </Link>

        <button>
          <FaGithub size={25}/> 
          <span>Sign in Github</span>
        </button>

      </div>

    </header>
  )
}