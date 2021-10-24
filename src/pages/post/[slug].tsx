import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import Prismic from '@prismicio/client';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { HeaderPost } from '../../components/HeaderPost';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    post !== undefined && (
      <div className={styles.container}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <img
          className={styles.banner}
          src={post.data.banner.url}
          alt="banner"
        />
        <div className={styles.containerContent}>
          <HeaderPost
            className={styles.headerPost}
            title={post.data.title}
            author={post.data.author}
            first_publication_date={post.first_publication_date}
          />

          {post.data.content.map(content => {
            return (
              <div key={content.heading} className={styles.postContent}>
                <h1>{content.heading}</h1>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(
  //   Prismic.Predicates.at('document.type', 'posts')
  // );

  return {
    fallback: true,
    paths: [],
  };
  // TODO
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'd MMM yyyy',
      { locale: ptBR }
    ),
    data: {
      title: response.data.title,
      banner: response.data.banner,
      content: response.data.content,
      author: response.data.author,
      update: format(new Date(response.last_publication_date), 'd MMM yyyy', {
        locale: ptBR,
      }),
    },
  };
  console.log('passei');
  return {
    props: { post },
    // revalidate: 10,
  };
};
