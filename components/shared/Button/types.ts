export type PropsType = {
  type: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  handleClick: () => void;
  children: React.ReactNode;
};
