type Props = {
  footerList: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function ListContainer({ footerList }: Props) {
  const firstList = footerList.slice(0, Math.ceil(footerList.length / 2));
  const secondList = footerList.slice(Math.ceil(footerList.length / 2));

  return (
    <div className="flex justify-around space-x-32">
      {/* List Left */}
      <div className="flex flex-col space-y-3 text-white">
        {firstList.map((list) => (
          <a
            href={list.href}
            key={list.id}
            className="hover:text-blue-400 hover:underline"
          >
            {list.name}
          </a>
        ))}
      </div>
      {/* List Right */}
      <div className="flex flex-col space-y-3 text-white">
        {secondList.map((list) => (
          <a
            href={list.href}
            key={list.id}
            className="hover:text-blue-400 hover:underline"
          >
            {list.name}
          </a>
        ))}
      </div>
    </div>
  );
}
