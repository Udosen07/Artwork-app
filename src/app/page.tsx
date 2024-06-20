'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BeatLoader from 'react-spinners/BeatLoader';

interface Artwork {
  id: number;
  title: string;
  image_id: string;
}

interface ApiResponse {
  data: Artwork[];
  config: {
    iiif_url: string;
  };
}

export default function Home() {
  const [art, setArt] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.artic.edu/api/v1/artworks');
        const data: ApiResponse = await res.json();
        setArt(data.data); // data.data contains the array of artworks
        setIiifUrl(data.config.iiif_url); // data.config contains the iiif_url
      } catch (error) {
        console.error('Error fetching the artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <BeatLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 grid w-[85%] grid-cols-1 gap-8 md:grid-cols-3">
      {art.map((artwork) => (
        <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
          <img
            src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
            className="h-[300px] w-full object-cover"
            alt={artwork.title}
          />
          <h1 className="my-5 text-lg font-bold">{artwork.title}</h1>
        </Link>
      ))}
    </div>
  );
}
