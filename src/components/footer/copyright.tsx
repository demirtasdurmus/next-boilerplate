type Props = {
  className: string;
};

export default function Copyright({ className }: Props) {
  return (
    <div className={className}>
      Copyright &copy; {new Date().getFullYear()} All rights reserved.
    </div>
  );
}
