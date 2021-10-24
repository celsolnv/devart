import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';
import { PostPreview } from '../components/PostPreview';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
  slug: string;
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
      <header>
        <img src="/logo.svg" alt="Logo" />
      </header>

      <main className={styles.posts}>
        {results.map(post => (
          <Link href={`/post/${post.slug}`} key={post.uid}>
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
  // console.log(JSON.parse(JSON.stringify(response)));
  const next_page = response.next_page ?? '';
  const posts = response.results.map(post => {
    return {
      slug: post.slugs,
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
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
