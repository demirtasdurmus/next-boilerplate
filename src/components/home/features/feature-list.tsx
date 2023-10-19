import ListItem from './list-item';

type Props = {
  listContent: {
    order: string;
    title: string;
    paragraph: string;
  }[];
};

export default function FeatureList({ listContent }: Props) {
  return (
    <div className="flex flex-col gap-8 md:w-1/2">
      {listContent.map((list) => (
        <ListItem
          key={list.order}
          order={list.order}
          title={list.title}
          paragraph={list.paragraph}
        />
      ))}
    </div>
  );
}
