import BeatLoader from 'react-spinners/BeatLoader';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <BeatLoader color="#000" />
    </div>
  );
}
