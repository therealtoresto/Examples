import { name, getAge } from './2-global.js';

console.log('Variable exported from other module:', name);

console.log('Global variables:');
console.dir({ 
    name: global.name, 
    age: global.age, 
    year: global.year
});

console.log('Function getAge execution:');
getAge();