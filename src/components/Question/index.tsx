import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';
type Props = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};
export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: Props) {
  return (
    <div
      className={cx(
        'question-container',
        { highlighted: isHighlighted && !isAnswered },
        { answered: isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
