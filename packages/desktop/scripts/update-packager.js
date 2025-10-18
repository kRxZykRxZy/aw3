const fs = require("fs");
const pathUtil = require("path");
const { computeSHA256, persistentFetch } = require("./lib");

const run = async () => {
    const releases = await (
        await persistentFetch(
            "https://api.github.com/repos/TurboWarp/packager/releases"
        )
    ).json();

    const packagerURL = releases[0].assets[0].browser_download_url;
    console.log(`Source: ${packagerURL}`);
    const packagerBuffer = await (
        await persistentFetch(packagerURL)
    ).arrayBuffer();

    const sha256 = computeSHA256(packagerBuffer);
    console.log(`SHA-256: ${sha256}`);

    fs.writeFileSync(
        pathUtil.join(__dirname, "packager.json"),
        JSON.stringify(
            {
                src: packagerURL,
                sha256,
            },
            null,
            2
        )
    );
    console.log(
        "This has only updated metadata; you still need to actually download the packager with download-packager.js"
    );
};

run().catch(err => {
    console.error(err);
    process.exit(1);
});
