'use client';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/courses/${slug}/1`);
  }, [slug, router]);

  return null;
}
