import React from 'react';
import { DocumentConverter } from './components/DocumentConverter';

function App() {
  // Replace with your actual document ID
  const documentId = "example-doc-123";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Document Converter & Viewer
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DocumentConverter documentId={documentId} />
      </main>
    </div>
  );
}

export default App;