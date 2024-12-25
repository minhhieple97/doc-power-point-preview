import React from 'react';
import { PDFViewer } from './PDFViewer';
import { fetchDocument } from '../services/api';
import { convertToPdf } from '../utils/documentConverter';

interface DocumentConverterProps {
  documentId: string;
}

export const DocumentConverter: React.FC<DocumentConverterProps> = ({ documentId }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const handleConversion = async () => {
    try {
      setLoading(true);
      setError(null);

      const document = await fetchDocument(documentId);
      const result = await convertToPdf(
        document.url,
        document.fileType,
        document.fileName
      );

      const url = URL.createObjectURL(result.pdfBlob);
      setPdfUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleConversion();
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};