// var messenger=require ('./app')

// messenger.printer('alolan');

const os=require('node:os');
console.log(`the pwd is : ${os.homedir()} and the platform is : ${os.platform()}`);

console.log(__dirname)
console.log(__filename)