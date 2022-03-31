import * as fs from 'fs';

const htmlFileData = fs.readFileSync('dist/universal-song-overlay/index.html').toString();
// let matches = htmlFileData.matchAll(/<script src="(?<scriptfile>[A-Za-z0-9.\-]*)" type="module"><\/script>/g);
const replacement = htmlFileData.replace(
  /<script src="(?<scriptfile>[A-Za-z0-9.\-]*)" type="module"><\/script>/g,
  (match, p1, offset, input, namedGroups) => {

    let scriptContents = fs.readFileSync('dist/universal-song-overlay/' + namedGroups['scriptfile']).toString();
    console.log('Replaced ' + namedGroups['scriptfile']);
    return '<script type="module">' + "\n" + scriptContents + "\n" + '</script>';
  });

fs.writeFileSync('dist/universal-song-overlay/index.html', replacement);
