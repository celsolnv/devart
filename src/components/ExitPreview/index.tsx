import Link from 'next/link';
import style from './style.module.scss';

interface ExitPreviewProps {
  preview: boolean;
}
export function ExitPreview({ preview }: ExitPreviewProps) {
  return (
    <div className={style.container}>
      {preview && (
        <aside>
          <Link href="/api/exit-preview">
            <a> Sair do modo Preview</a>
          </Link>
        </aside>
      )}
    </div>
  );
}
