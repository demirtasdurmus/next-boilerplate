'use client';

import { useGetExamples } from '@/services/example.service';
import React from 'react';
import { PulseLoader } from 'react-spinners';

export default function SearchPage() {
  const { data: examples, status } = useGetExamples();

  if (status === 'loading') {
    return <PulseLoader />;
  }

  return <div>{status === 'success' && JSON.stringify(examples)}</div>;
}
