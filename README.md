# MD - HTML - PDF
A project of playing with ways to make Markdown documentation readable and shareable everywhere. This app will take a specified markdown file and create an HTML file and PDF version.

### Install
```bash
npm install
```

### Run with NPM
```bash
npm start -- <INPUT_MARKDOWN_FILE> <OUTPUT_HTML_FILE>
```
OR
### Run with Node
```bash
node index.js <INPUT_MARKDOWN_FILE> <OUTPUT_HTML_FILE>
```

## To Do:
- [x] Build html render and PDF creation
- [x] Handle auto new file name
- [ ] Provide support for only one type of output file format
- [ ] Turn it into a Electron App?
- [ ] Make it a web app with Vue.js?


## Some Supported Elements

|Column 🚀|Header 🤟🏼|Names 💩|
|:--|:--:|--:|
|Some|Row|Data|
|Some|more row (note the formatted text...) |data|

- Emojis 🔥
- ~~Strikethrough~~

## Some known issues
- On Windows 10 emojis are not in color when printed to PDF. This appears to be a chromium issue. Tested on Windows 10 and macOS and macOS worked as expected (emojis have color when printed to PDF and in print preview.) May need to file a bug report. 
  - Reference Links:
  - https://github.com/puppeteer/puppeteer/issues/4252
  - https://bugs.chromium.org/p/chromium/issues/detail?id=617403&can=1&q=emoji%20color%20os%3DWindows