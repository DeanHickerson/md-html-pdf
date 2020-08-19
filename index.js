const showdown = require('showdown');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const converter = new showdown.Converter({
	tables:true,
	tasklists:true,
	strikethrough:true,
	emoji:true
});
const args = process.argv.slice(2);

(async () => {
    let mdFile;
    let htmlFile;
    if(args.length > 0) {
        mdFile = args[0];
        if(args.length > 1) {
            htmlFile = args[1];
            // check for file extension in the supplied name
            if(htmlFile.search(/\.html/g) == -1) {
                htmlFile += '.html';
            }
        } else {
            htmlFile = `${mdFile.slice(0,-3)}.html`;
        }
    } else {
        return console.error(`Please provide a target file name to the node arguments. Output file name is optional.`);
    }
    let css = await fs.promises.readFile(`gfm.min.css`,`utf-8`,(err,data) => data);
    let md = await fs.promises.readFile(`${mdFile}`,`utf-8`,(err,data) => data);
    let output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${htmlFile.slice(0,-5) || path.basename(mdFile).slice(0,3)}</title>
        <style>
        ${css}
		.markdown-body{box-sizing:border-box;min-width:200px;max-width:980px;margin:0 auto;padding:45px}@media (max-width:767px){.markdown-body{padding:15px}}table{word-break:break-word;}
		h1,h2,h3,h4,h5 {
			page-break-after: avoid;
		}
		html {-webkit-print-color-adjust: exact;}
        </style>
    </head>
    <body class="markdown-body">
        ${converter.makeHtml(md)}
    </body>
    </html>`;
    await fs.promises.writeFile(`${htmlFile}`,output,err => {
        if(err){console.log(err)}
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
	await page.setContent(output);
    await page.pdf({
        path: `${htmlFile.slice(0,-5)}.pdf`,
        format: 'Letter',
        margin: {
            top: '.5in',
            bottom: '.5in',
            left: '.5in',
            right: '.5in'
        }
    });
    await browser.close();
})();