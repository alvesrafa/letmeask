import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
};

export function Button({ outline = false, ...rest }: ButtonProps) {
  return (
    <button className={`container-button ${outline && 'outline'}`} {...rest} />
  );
}
