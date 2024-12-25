import { DocxPreview } from 'docx-preview';
import { PDFDocument } from 'pdf-lib';
import { ConversionResult } from '../types/document';

export async function convertDocxToPdf(file: ArrayBuffer): Promise<Blob> {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  await DocxPreview.renderAsync(file, container);
  
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  
  const pdfBytes = await pdfDoc.save();
  document.body.removeChild(container);
  
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function convertPptxToPdf(file: ArrayBuffer): Promise<Blob> {
  // Note: This is a simplified implementation
  // In a real application, you might want to use a more robust solution
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const pdfBytes = await pdfDoc.save();
  
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function convertToPdf(
  url: string,
  fileType: 'docx' | 'pptx',
  fileName: string
): Promise<ConversionResult> {
  const response = await fetch(url);
  const fileBuffer = await response.arrayBuffer();
  
  let pdfBlob: Blob;
  
  if (fileType === 'docx') {
    pdfBlob = await convertDocxToPdf(fileBuffer);
  } else {
    pdfBlob = await convertPptxToPdf(fileBuffer);
  }
  
  return {
    pdfBlob,
    fileName: fileName.replace(/\.(docx|pptx)$/, '.pdf')
  };
}