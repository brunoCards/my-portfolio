'use client';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const words = `Hi, I am Bruno`;

export function TextGenerate() {
  return <TextGenerateEffect words={words} className='text-primary' />;
}
