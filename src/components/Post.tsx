import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export const Post = function ({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    { text: 'Well done bro!', id: uuidv4() },
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    { locale: ptBR }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewComment = function (event: FormEvent) {
    event.preventDefault();
    if (newCommentText.trim().length === 0) return;
    setComments((prev) => {
      return [...prev, { text: newCommentText, id: uuidv4() }];
    });
    setNewCommentText('');
  };

  const handleNewCommentChange = function (
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  };

  const handleNewCommentInvalid = function (
    event: InvalidEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  };

  const deleteComment = function (id: string) {
    setComments((prev) => {
      const updatedComments = prev.filter((comment) => {
        return comment.id !== id;
      });

      return updatedComments;
    });
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={''}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={uuidv4()}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={uuidv4()}>
                <a href="">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={uuidv4()}
              content={comment.text}
              onDeleteComment={deleteComment}
              id={comment.id}
            />
          );
        })}
      </div>
    </article>
  );
};
