import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import ExampleCard from './example-card';

type Props = {
  examples: TGetExamplesResponse['data'];
};

export default function Examples({ examples }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {examples.map((example) => (
        <ExampleCard
          key={example.id}
          example={example}
          width={200}
          height={120}
        />
      ))}
    </div>
  );
}
