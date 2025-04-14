import xml2js from 'xml2js';
import settings from '../config/settings';
export default class TEIService {
    constructor() {}

    /**
     * get font based on text language
     * @param {*} language 
     * @returns 
     */
    getFont(language) {
        return settings.fontMap[language] || settings.defaultFont;
    }

    /**
     * extract text from XML node
     * @param {*} node 
     * @returns 
     */
    extractText(node) {
        if (typeof node === 'string') {
            return node;
        }
        if (typeof node === 'object') {
            let text = '\n';
            if (node['type']) {
                return text;
            }

            for (let key in node) {
                if (['pb', 'lb', 'cb'].includes(key)) {
                    continue;
                }

                if (key === '_' && (node[key] === 'p' || node[key] === 'l')) {
                    text += extractText(node[key]);
                } else {
                    text += extractText(node[key]);
                }
            }
            return text;
        }
        return '';
    }

    /**
     * parse TEI encoded text content from XML
     * @param {*} content 
     * @returns 
     */
    parseContent(content) {
        // todo - add more sophisticated parsing logic
        // handle different situations (lines, paragraphs, etc.)
        // for now, just split by new lines
        // and filter out empty lines
        // to handle different structures in the TEI content
        console.log('parsing content');

        let textContent = this.extractText(content);
        return textContent.split('\n').filter((line) => line.trim().length > 0);
    }

    /**
     * parse XML files in the given directory
     * @param {*} xmlContent 
     */
    async parseXMLContent(xmlContent) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlContent, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    return;
                }

                // TEI sections
                const TEI = result.TEI || result['TEI?.2'];
                const teiHeader = TEI?.teiHeader[0] || {};
                const fileDesc = teiHeader?.fileDesc ? teiHeader?.fileDesc[0] : {};
                const encodingDesc = teiHeader?.encodingDesc ? teiHeader?.encodingDesc[0] : {};
                const revisionDesc = teiHeader?.revisionDesc ? teiHeader?.revisionDesc[0] : {};

                // book info
                const bookDetails = fileDesc?.titleStmt ? fileDesc?.titleStmt[0] : {};
                const publisherDetails = fileDesc?.publicationStmt ? fileDesc?.publicationStmt[0] : {};
                const languageDetails = teiHeader?.profileDesc ? teiHeader?.profileDesc[0]?.langUsage[0] : {};

                // misc
                const sourceDetails = fileDesc?.sourceDesc ? fileDesc?.sourceDesc[0] : {};
                const encodingDetails = encodingDesc || {};
                const revisionDetails = revisionDesc || {};

                // extract
                try {
                    const title = bookDetails?.title ? bookDetails?.title[0]?._ || bookDetails?.title[0] : '';
                    const author = bookDetails?.author ? bookDetails?.author[0] : '';
                    const language = languageDetails?.language ? languageDetails?.language[0]?._ : '';
                    const publisher = publisherDetails?.publisher ? publisherDetails?.publisher[0] : '';
                    const publicationDate = publisherDetails?.date ? publisherDetails?.date[0]?._ || publisherDetails?.date[0] : '';
                    const canonicalId = publisherDetails?.idno ? publisherDetails?.idno[0]?._ : '';
                    const font = this.getFont(language);

                    // format metadata & content information for database
                    const metadata = {
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
                    const content = TEI?.text[0]?.body[0] || TEI?.text[0]?.body[0];

                    const dataRows = this.parseContent(content);

                    resolve(dataRows);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

