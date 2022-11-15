import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export const Post = function ({ author, content, publishedAt }) {
  const [comments, setComments] = useState([]);
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

  const handleCreateNewComment = function () {
    event.preventDefault();
    if (newCommentText.trim().length === 0) return;
    setComments((prev) => {
      return [...prev, { text: newCommentText, id: uuidv4() }];
    });
    setNewCommentText('');
  };

  const handleNewCommentChange = function () {
    setNewCommentText(event.target.value);
  };

  const deleteComment = function (id) {
    setComments((prev) => {
      const updatedComments = prev.filter((comment) => {
        return comment.id !== id;
      });

      return updatedComments;
    });
  };

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
        />

        <footer>
          <button type="submit">Publicar</button>
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
