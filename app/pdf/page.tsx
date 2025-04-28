'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Adjust the import path if necessary

const ViewPdfPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLang = (searchParams?.get('lang') as 'en' | 'es' | null) ?? 'en';

  const [language, setLanguage] = useState<'en' | 'es'>(initialLang);

  const pdfUrls = {
    en: '/DagSwapDex_EN.pdf',
    es: '/DagSwapDex_ES.pdf',
  };

  const pdfUrl = pdfUrls[language];

  useEffect(() => {
    const current = new URLSearchParams(searchParams?.toString());
    current.set('lang', language);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    // Use push instead of replace if you want browser history
    router.push(`${pathname}${query}`);
  }, [language, pathname, router, searchParams]);

  // Handle language change from select
  const handleLanguageChange = (value: 'en' | 'es') => {
    setLanguage(value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4">
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        className="flex-grow border-none w-full" 
        key={pdfUrl}
      />
    </div>
  );
};

export default ViewPdfPage;
