import styles from './Avatar.module.css';

export const Avatar = function ({ hasBorder = false, src }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
};
