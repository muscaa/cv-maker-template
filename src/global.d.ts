import { WindowCVMaker } from "@/api/CVMaker";
import { WindowPDFMaker } from "@/api/PDFMaker";

declare global {
    interface Window extends
        WindowCVMaker,
        WindowPDFMaker,
        
        // add more interfaces here
    {}
}
