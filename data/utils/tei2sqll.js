const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const sqlite3 = require('sqlite3').verbose();

const literatureDirectory = __dirname + '/../literature/canonical-greekLit-master/data';

const languageMap = {
  greek: 'GFSDidot_400Regular',
  latin: 'serif',
  japanese: 'sans-serif',
};

const db = new sqlite3.Database('./perseus.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
  if (!err) {
    console.log('Successfully created DB file: perseus.db');
  }
});

// close database
function closeDb() {
  db.close(function (err) {
    if (!err) {
      console.log('Successfully closed DB file: perseus.db');
    }
  });
}

// create database
function createDb() {
  db.serialize(function () {
    db.run('CREATE VIRTUAL TABLE IF NOT EXISTS text_fts USING fts4(id, title, language, font, content, metadata)');
    console.log('FTS table created.');
  });
}

// load data into database
function loadData(dataRows, metadata) {
  db.serialize(function () {
    console.log('Inserting demo data...');
    let query = db.prepare('INSERT INTO text_fts (id, title, language, font, content, metadata) VALUES (?, ?, ?, ?, ?, ?)');
    query.run([metadata.canonicalId, metadata.title, metadata.language, metadata.font, dataRows.join('\n'), JSON.stringify(metadata)]);
  });
}

// get font based on text language
function getFont(language) {
  return languageMap[language] || 'serif';
}

// extract text from XML node
function extractText(node) {
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'object') {
    let text = '';
    for (let key in node) {
      if (key === '_') {
        text += node[key];
      } else {
        text += extractText(node[key]);
      }
    }
    return text;
  }
  return '';
}

// parse TEI encoded text content from XML - and return as array of lines of text, with all XML tags removed
// anything not directly textual should be ignored.
function parseContent(content) {
  console.log('parsing content');
  let textContent = extractText(content);
  return textContent.split('\n').filter((line) => line.trim().length > 0);
}

// parse XML files in the given directory
function parseXMLFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        return parseXMLFiles(filePath); // Recursively parse subdirectories
      } else if (path.extname(file) === '.xml' && file !== '__cts__.xml') {
        // Load and parse XML file
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error reading XML file:', err);
            return;
          }

          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.error('Error parsing XML:', filePath, err);
              return;
            }

            // TEI sections
            let TEI = result.TEI || result['TEI?.2'];
            let teiHeader = TEI?.teiHeader[0] || {};
            let fileDesc = teiHeader?.fileDesc ? teiHeader?.fileDesc[0] : {};
            let encodingDesc = teiHeader?.encodingDesc ? teiHeader?.encodingDesc[0] : {};
            let revisionDesc = teiHeader?.revisionDesc ? teiHeader?.revisionDesc[0] : {};

            // book info
            let bookDetails = fileDesc?.titleStmt[0] || {};
            let publisherDetails = fileDesc?.publicationStmt[0] || {};
            let languageDetails = teiHeader?.profileDesc[0]?.langUsage[0] || {};

            // misc
            let sourceDetails = fileDesc?.sourceDesc[0] || {};
            let encodingDetails = encodingDesc || {};
            let revisionDetails = revisionDesc || {};

            // extract
            try {
              let title = bookDetails?.title ? bookDetails?.title[0]?._ || bookDetails?.title[0] : '';
              let author = bookDetails?.author ? bookDetails?.author[0] : '';
              let language = languageDetails?.language ? languageDetails?.language[0]?._ : '';
              let publisher = publisherDetails?.publisher ? publisherDetails?.publisher[0] : '';
              let publicationDate = publisherDetails?.date ? publisherDetails?.date[0]?._ || publisherDetails?.date[0] : '';
              let canonicalId = publisherDetails?.idno ? publisherDetails?.idno[0]?._ : '';
              let font = getFont(language);

              // format metadata & content information for database
              let metadata = {
                title,
                author,
                language,
                publisher,
                font,
                publicationDate,
                canonicalId,
                misc: {
                  sourceDetails,
                  encodingDetails,
                  revisionDetails,
                },
              };

              // todo - parse lines from text
              let content = TEI?.text[0]?.body[0] || TEI?.text[0]?.body[0];

              let dataRows = parseContent(content);

              loadData(dataRows, metadata);
            } catch (e) {
              console.log('Error extracting metadata:', e);
            }
          });
        });
      }
    });
  });
}

createDb();

parseXMLFiles(literatureDirectory);

// closeDb();
