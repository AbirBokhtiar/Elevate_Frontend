// /src/app/list/page.tsx
import React, { Suspense } from 'react';
import List from '../components/List';
import Skeleton from '@/app/components/skeleton';

export default function ListPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <List />
    </Suspense>
  );
}
