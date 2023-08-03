/* eslint-disable */
console.log('Hello universe!');

const obj = {
    name: 'Adam',
    city: 'Kyiv',
    born: '2022',
    parents: [
        {
            name: 'John',
            city: 'Kyiv',
            born: '1980',
        },
        {
            name: 'Amanda',
            city: 'Kyiv',
            born: '1985',
        }
    ]
};
obj.country = 'Ukraine';

Object.defineProperty(obj, 'parentsCount', {
    enumerable: false,
    writable: false,
    value: 2
})

console.log({obj});

console.dir(obj);

console.dir({ obj }, { showHidden: true, depth: 20, colors: true });

console.error('Error execution');

console.time('Loop time');

const arr = [];

for ( let i = 0; i < 10000; i++ ) {
    arr.push(i);
}

console.timeEnd('Loop time');

console.trace('Trace here');

console.log(Object.keys(console));