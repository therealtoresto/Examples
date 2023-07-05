console.dir({
    currentDir: process.cwd(),
    processId: process.pid,
    platform: process.platform,
    release: process.release,
    title: process.title,
    nodeVersion: process.version,
    versions: process.versions
});

console.log('\n Command line parameters:');
process.argv.forEach((value, index) => {
    console.log(`${index}: ${value}`);
});

console.log('\nEnvironment variables:');
for (const name in process.env) {
    const value = process.env[name];
    console.log(`${name}: ${value}`);
}