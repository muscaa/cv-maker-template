export interface CVMaker {
    
    setPDFUrl(url: string): void;

    addScript(options: { src?: string, text?: string }): Promise<HTMLScriptElement>;
}

export interface WindowCVMaker {
    cvmaker: CVMaker;
}

export const cvmaker = window.cvmaker;
