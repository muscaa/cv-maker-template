import BlobStreamType from "blob-stream";
import PDFDocumentType from "pdfkit";

export interface PDFMaker {

}

export interface WindowPDFMaker {
    blobStream: typeof BlobStreamType;
    PDFDocument: typeof PDFDocumentType;
}

export const blobStream = window.blobStream;
export const PDFDocument = window.PDFDocument;
