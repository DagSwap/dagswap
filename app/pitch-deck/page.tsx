import { Suspense } from 'react';
import ViewPdfClient from '@/app/pitch-deck/pdf-viewer';

// Optional: Add a simple loading fallback component
const LoadingPdf = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading PDF...
    </div>
  );
};

const ViewPdfPage = () => {
  return (
    <Suspense fallback={<LoadingPdf />}>
      <ViewPdfClient />
    </Suspense>
  );
};

export default ViewPdfPage;
