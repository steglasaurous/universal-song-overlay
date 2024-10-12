import * as fs from 'fs';
const outputDir = 'dist/universal-song-overlay/browser/';
const htmlFileData = fs.readFileSync(outputDir + 'index.html').toString();
const replacement = htmlFileData.replace(
  /<script src="(?<scriptfile>[A-Za-z0-9.\-]*)" type="module"><\/script>/g,
  (match, p1, offset, input, namedGroups) => {

    let scriptContents = fs.readFileSync(outputDir + namedGroups['scriptfile']).toString();
    console.log('Replaced ' + namedGroups['scriptfile']);
    return '<script type="module">' + "\n" + scriptContents + "\n" + '</script>';
  });

fs.writeFileSync(outputDir + 'index.html', replacement);
