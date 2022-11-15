import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export const Comment = function ({ content }) {
  return (
    <div className={styles.comment}>
      <Avatar src={'https://avatars.githubusercontent.com/u/84985491?v=4'} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Anthony Ribeiro</strong>
              <time
                title="13 de novembro de 2022"
                dateTime="2022-11-13 18:00:00"
              >
                Cerca de 2h
              </time>
            </div>

            <button>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
