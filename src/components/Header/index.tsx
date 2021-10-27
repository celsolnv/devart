import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <Link href="/">
      <a>
        <header>
          <img src="/logo.svg" alt="logo" />
        </header>
      </a>
    </Link>
  );
}
