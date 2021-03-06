const config = require("../config");
const fs = require("fs");
const { createDoc, createDocPages } = require("./docs.js");
const addHomepage = require("./homepage");
const copyDir = require("./util/copyDir");

const { outdir, sourcedir, docsDirName, assetsDir } = config.dev;

const docs = fs
	.readdirSync(sourcedir)
	.filter((file) => file.match(/\.md$/))
	.map((doc) => doc.slice(0, -3)) // chop off .md
	.map((doc) => {
		console.log(`Parsing "${doc}"...`);
		return createDoc(doc);
	});

if (!fs.existsSync(outdir)) {
	console.log(`Building output directory "${outdir}"...`);
	fs.mkdirSync(outdir);
}

createDocPages(docs, docsDirName);
addHomepage(docs, docsDirName);

const assetsOutdir = [outdir, "assets"].join("/");
copyDir(assetsDir, assetsOutdir);

console.log("Website generated!");
