import Link from 'next/link';
import style from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <Link href="/">
      <a className={style.headerContainer}>
        <header>
          <img src="/logo.svg" alt="logo" />
        </header>
      </a>
    </Link>
  );
}
