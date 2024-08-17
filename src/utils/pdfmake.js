const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Construct absolute paths to font files
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/fonts/Roboto-MediumItalic.ttf')
    }
};


const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {

    // console.log(path.join(__dirname, '../../public/font/Roboto-Regular.ttf'));


    const docDefinition = {
        content: [
            {
                image: path.join(__dirname, '../../public/images/fruitable.jpg'),
                width: 150,
                height: 100,
                margin: [0, 20, 0, 25]
            },
            { text: 'Invoice', 
                fontSize: 20,
                bold: true,
                margin: [200, 0, 100, 30] },
            { 
                columns: [
                    {
                        text: [
                            { text: 'Name: ', bold: true,}, 'Meet\n',
                            { text: 'Address: ', bold: true }, 'Surat\n',
                            { text: 'Email: ', bold: true }, 'meetdobariya480@gmail.com\n',
                            { text: 'Phone no: ', bold: true }, '9016758258\n'
                        ]
                    }
                ]

            },
            { text: '\n' },
            {
                table: { 
                    // headerRows: 1,
                    // widths: ['*', '*', '*', '*', '*'], // Set column widths to be equal
                    body: [
                        ['Sr. No.', 'Items', 'Quantity', 'Price', 'Total Price'],
                        ['1', 'apple 15 pro', '1', '50000', '50000'],
                        ['2', 'cover', '2', '1000', '2000'],
                        [{ text: 'Total Amount', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}, { text: '52000', bold: true }]
                    ]
                },
            },

        ],
    };

    // Construct the absolute path for the output PDF
    const outputPath = path.join(__dirname, '../../../../../Full Stack Project/backend/Ecommarce/document.pdf');

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;