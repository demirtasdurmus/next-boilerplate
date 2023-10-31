import { TGetExampleByIdResponse } from '@/app/(server)/api/examples/[id]/route';
import { fetchExampleById } from '@/services/example.service';
import { notFound } from 'next/navigation';
import ExampleDetail from '../components/example-detail';

type Props = {
  params: {
    slug: [string, string];
  };
};

export default async function Example({ params }: Props) {
  let example: TGetExampleByIdResponse['data'];
  try {
    example = await fetchExampleById(params.slug[1]);
  } catch (error: any) {
    if (error.status === 'fail') return notFound();
    throw error;
  }

  return (
    <div className="mx-2 my-2 flex items-center md:mx-4 md:my-4">
      <ExampleDetail example={example} />
    </div>
  );
}
