import type { ReactNode } from 'react'

type Content = {
  children: ReactNode;
};

export const Block = ({ children }: Content) => {
  return (
    <li className="block">
      <div className="block__line">{ children }</div>
    </li>
  )
};