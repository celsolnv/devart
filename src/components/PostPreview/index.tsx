import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostObject {
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
  first_publication_date: string;
}
interface PostData {
  post: PostObject;
}

export function PostPreview({ post }: PostData): JSX.Element {
  return (
    <div>
      <h1>{post.data.title}</h1>
      <span>{post.data.subtitle}</span>

      <small>
        <img src="/icons/calendar.svg" alt="calendar" />
        {format(new Date(post.first_publication_date), 'd MMM yyyy', {
          locale: ptBR,
        })}
      </small>
      <small>
        <img src="/icons/user.svg" alt="User" /> {post.data.author}
      </small>
    </div>
  );
}
