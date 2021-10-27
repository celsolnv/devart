import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';
import { PostPreview } from '../components/PostPreview';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { next_page, results } = postsPagination;
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.posts}>
        {results.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a>
              <PostPreview post={post} />
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );
  const next_page = response.next_page ?? '';
  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
  const postsPagination = {
    next_page,
    results: posts,
  };
  return {
    props: {
      postsPagination,
    },
  };
};
