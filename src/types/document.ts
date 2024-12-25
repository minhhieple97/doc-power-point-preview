export interface DocumentResponse {
  url: string;
  fileName: string;
  fileType: 'docx' | 'pptx';
}

export interface ConversionResult {
  pdfBlob: Blob;
  fileName: string;
}