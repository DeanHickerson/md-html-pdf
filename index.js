const showdown = require('showdown');
const fs = require('fs');
const converter = new showdown.Converter();
const args = process.env.slice(2);

(async () => {
    let mdFile;
    let htmlFile;
    if(args.length > 1) {
        mdFile = args[0];
        if(args.length > 1) {
            htmlFile = args[1];
        }
    } else {
        console.error(`please provide a target file name to the node arguments. Output file name is optional.`);
    }
    let css = await fs.readFile(`gfm.css`,`utf-8`,(err,data) => data);
    let md = await fs.readFile(`${mdFile}`,`utf-8`,(err,data) => data);
    let output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${mdFile}</title>
        <style>${css}</style>
    </head>
    <body>
        ${converter.makeHtml(md)}
    </body>
    </html>`;
    await fs.writeFile(`${htmlFile || `${mdFile.slice(0,-3)}.html`}`,output,err => {
        if(err){console.log(err)}
    });
})();