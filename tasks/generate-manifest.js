/**
 * Generates the "manifest.json" file for the extension, with the version as
 * specified in the "package.json".
 */

const path = require("path");
const fs = require("fs");

const template = require("../manifest_template.json");
const packageInfo = require("../package.json");

template.version = packageInfo.version;
const manifest = JSON.stringify(template, null, 4);

const output = path.resolve(__dirname, "../public/manifest.json");

fs.writeFileSync(output, manifest);
