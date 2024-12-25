export const fetchDocument = async (documentId: string): Promise<DocumentResponse> => {
  // This is a mock implementation. Replace with your actual API call
  const response = await fetch(`/api/documents/${documentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch document');
  }
  return response.json();
};