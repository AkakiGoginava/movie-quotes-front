export type PropsType = {
  type: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};
