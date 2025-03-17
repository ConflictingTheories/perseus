const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const literatureDirectory = __dirname + '/../literature/canonical-greekLit-master/data';

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
        parseXMLFiles(filePath); // Recursively parse subdirectories
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
            // main metadata
            let bookDetails = result.TEI?.teiHeader[0].fileDesc[0].titleStmt[0];
            let publisherDetails = result.TEI?.teiHeader[0].fileDesc[0].publicationStmt[0];
            let languageDetails = result.TEI?.teiHeader[0].profileDesc[0].langUsage[0];
            // misc
            let sourceDetails = result.TEI?.teiHeader[0].fileDesc[0].sourceDesc[0];
            let encodingDetails = result.TEI?.teiHeader[0].encodingDesc[0];
            let revisionDetails = result.TEI?.teiHeader[0].revisionDesc[0];

            // extract
            let title = bookDetails.title[0]._ || bookDetails.title[0];
            let author = bookDetails.author[0];
            let language = languageDetails.language[0]._;
            let publisher = publisherDetails.publisher[0];
            let publicationDate = publisherDetails.date[0]._ || publisherDetails.date[0];
            let canonicalId = result.TEI?.teiHeader[0].fileDesc[0].publicationStmt[0].idno[0]._;

            // format metadata & content information for database
            let metadata = {
              title,
              author,
              language,
              publisher,
              publicationDate,
              canonicalId,
              misc: {
                sourceDetails,
                encodingDetails,
                revisionDetails,
              },
            };

            // todo - parse lines from text
            let content = result.TEI?.text[0].body[0];

            // Process the parsed XML data here
            console.log(content, metadata);

            // todo

            // todo - save to database
          });
        });
      }
    });
  });
}

parseXMLFiles(literatureDirectory);
