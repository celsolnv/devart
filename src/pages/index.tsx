import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import Link from 'next/link';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';
import { PostPreview } from '../components/PostPreview';
import Header from '../components/Header';
import styles from './home.module.scss';

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
  preview: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const { next_page, results } = postsPagination;
  const [posts, setPosts] = useState(results);
  const [nextPage, setNextPage] = useState(next_page);

  async function handleLoadMorePosts(): Promise<void> {
    const req = await (await fetch(next_page)).json();
    const newPosts = posts;
    req.results.forEach(post => {
      const formattedPost = {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
      newPosts.push(formattedPost);
    });
    setPosts(newPosts);
    setNextPage(req.next_page);
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.posts}>
        {posts.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a>
              <PostPreview post={post} />
            </a>
          </Link>
        ))}
        {nextPage && (
          // eslint-disable-next-line react/button-has-type
          <button
            onClick={handleLoadMorePosts}
            className={styles.loadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
      <footer>
        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a> Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  console.log(preview, previewData);
  const prismic = getPrismicClient();
  const response = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts'),
    {
      pageSize: 1,
      ref: previewData?.ref ?? null,
    }
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
      preview,
    },
  };
};
