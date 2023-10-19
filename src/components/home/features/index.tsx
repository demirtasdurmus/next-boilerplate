import FeatureList from './feature-list';
import Intro from './intro';

const introContent = {
  title: 'What is different about us?',
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, repellat dicta asperiores, voluptatem magni voluptate incidunt ratione impedit nesciunt sapiente distinctio. Possimus reprehenderit pariatur, illum voluptatem harum explicabo magnam ullam.',
};

const listContent = [
  {
    order: '01',
    title: 'Track your progress',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt enim ipsa saepe dicta alias iure molestias. Et nemo mollitia vero a eos officia voluptatum, aut at, corrupti, asperiores quisquam. Soluta?',
  },
  {
    order: '02',
    title: 'Measure your success',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt enim ipsa saepe dicta alias iure molestias. Et nemo mollitia vero a eos officia voluptatum, aut at, corrupti, asperiores quisquam. Soluta?',
  },
  {
    order: '03',
    title: 'Receive necessary feedback',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt enim ipsa saepe dicta alias iure molestias. Et nemo mollitia vero a eos officia voluptatum, aut at, corrupti, asperiores quisquam. Soluta?',
  },
];

export default function Features() {
  return (
    <section className="container mx-auto mt-10 flex flex-col gap-12 px-4 md:flex-row md:space-y-0">
      {/* Feature Intro */}
      <Intro
        title={introContent.title}
        description={introContent.description}
      />
      {/* Features List */}
      <FeatureList listContent={listContent} />
    </section>
  );
}
