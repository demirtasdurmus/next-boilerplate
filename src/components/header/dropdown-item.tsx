import Link from 'next/link';

type Props = {
  item: {
    title: string;
    route: string;
  };
  toggle: () => void;
};

export default function DropdownItem({ item, toggle }: Props) {
  return (
    <Link
      key={item.route}
      className="px-4 py-1 text-black hover:bg-zinc-300 hover:text-zinc-500"
      href={item.route}
      onClick={toggle}
    >
      {item.title}
    </Link>
  );
}
