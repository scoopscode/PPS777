'use strict';

const fs = require('fs');
const { paramCase } = require('change-case');
const [html, js] = require('./templates.js');

const trim = (text) => `${text.trimStart().trimEnd()}\n`;

// The bundle code contains `$`, which is a special character
// in JS replace and replaceAll, so we can't use those
const replace = (s, search, replacement) => s.split(search).join(replacement);

module.exports = ({
    name, config, imports = [], outputDir, getCssBundle,
}) => ({
    name: 'template',
    writeBundle(_config, bundle) {
        const { code: jsCode } = bundle[`${name}-gen.js`];
        const cssCode = getCssBundle();

        const nameKebab = paramCase(name.toLowerCase());

        const process = (s) => {
            let result = s;
            result = replace(result, 'INSTRUMENT_NAME_LOWER', nameKebab);
            result = replace(result, 'INSTRUMENT_NAME', name);
            result = replace(result, 'INSTRUMENT_BUNDLE', jsCode);
            result = replace(result, 'INSTRUMENT_STYLE', cssCode);
            result = replace(result, 'INSTRUMENT_IS_INTERACTIVE', config.isInteractive || false);
            return result;
        };

        // Replace stuff in both the HTML and JS
        const templateHtml = process(html(imports));
        const templateJs = process(js);

        // Write output
        fs.mkdirSync(`${outputDir}/${name}`, { recursive: true });
        fs.writeFileSync(`${outputDir}/${name}/template.html`, trim(templateHtml));
        fs.writeFileSync(`${outputDir}/${name}/template.js`, trim(templateJs));
    },
});