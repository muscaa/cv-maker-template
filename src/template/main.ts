import { cvmaker } from "@/api/CVMaker";

async function main() {
    await cvmaker.addScript({ src: 'https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js' });
    await cvmaker.addScript({ src: 'https://github.com/foliojs/pdfkit/releases/download/v0.15.0/pdfkit.standalone.js' });

    const doc = new window.PDFDocument();
    const stream = doc.pipe(window.blobStream());
    stream.on('finish', function () {
        const url = stream.toBlobURL('application/pdf');

        cvmaker.setPDFUrl(url);
    });

    doc.text('Hello world!');

    const response = await fetch("https://raw.githubusercontent.com/muscaa/cv-maker-resources/refs/heads/main/fonts/satisfy/Satisfy-Regular.ttf");
    const fontBuffer = await response.arrayBuffer();

    doc.registerFont('Satisfy-Regular', fontBuffer);

    doc
        .font('Satisfy-Regular')
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100);

    doc
        .addPage()
        .fontSize(25)
        .text('Here is some vector graphics...', 100, 100);

    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

    doc
        .addPage()
        .fillColor('blue')
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');

    doc.end();
}

main();
