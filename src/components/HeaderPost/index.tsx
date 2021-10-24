interface HeaderPostData extends React.ComponentProps<'div'> {
  title: string;
  author: string;
  first_publication_date: string;
}
export function HeaderPost({
  title,
  author,
  first_publication_date,
  ...props
}: HeaderPostData): JSX.Element {
  return (
    <div {...props}>
      <h1>{title}</h1>

      <small>
        <img src="/icons/calendar.svg" alt="calendar" />
        {first_publication_date}
      </small>
      <small>
        <img src="/icons/user.svg" alt="User" /> {author}
      </small>
    </div>
  );
}
