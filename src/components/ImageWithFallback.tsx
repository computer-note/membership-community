'use client';

import { ImageProps } from 'next/image';
import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';

interface Props extends ImageProps {
  fallback?: string;
}

function ImageWithFallback({
  fallback = '/default_profile.png',
  src,
  ...props
}: Props) {
  const [error, setError] = useState<null | SyntheticEvent>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      onError={e => setError(e)}
      src={error ? fallback : src}
      {...props}
    />
  );
}

export default ImageWithFallback;
