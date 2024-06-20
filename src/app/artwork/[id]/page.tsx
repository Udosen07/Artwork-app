'use client';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  description: string;
}

interface Config {
  iiif_url: string;
}

interface ArtworkPageProps {
  params: { id: string };
}

async function fetchArtwork(id: string) {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    async function getArtwork() {
      const data = await fetchArtwork(params.id);
      if (data) {
        setArtwork(data.data);
        setConfig(data.config);
      } else {
        notFound();
      }
    }
    getArtwork();
  }, [params.id]);

  if (!artwork || !config) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/" className="ml-5 mt-8 flex items-center gap-1 text-xl">
        <IoIosArrowBack />
        <h1>Home</h1>
      </Link>
      <div className="mx-auto my-10 flex w-[85%] flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">{artwork.title}</h1>
        <img
          src={`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
          className="h-full w-full max-w-2xl object-cover"
          alt={artwork.title}
        />
        <div className="my-4 flex items-center">
          <h1 className="mr-4 text-xl font-semibold">Description</h1>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {showDescription ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>

        {showDescription && (
          <p className="mx-auto w-[90%] break-words text-lg">
            {artwork.description
              ? artwork.description
              : 'This is one of the unique and exquisite pieces displayed in our gallery'}
          </p>
        )}
      </div>
    </div>
  );
}
