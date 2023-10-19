import Image from 'next/image';
import Link from 'next/link';

export default function CompanyLogo() {
  return (
    <div className="pt-2">
      <Link href="/">
        <Image
          src="/next.svg"
          width={0}
          height={0}
          alt="next-logo"
          sizes="100vw"
          className="h-auto w-32"
        />
      </Link>
    </div>
  );
}
