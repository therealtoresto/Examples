console.log('Hello universe!');

// const age = 50;

export const name = 'Taras';

export const getAge = () => {
    console.log('Variable age:', age);
}

// if uncomment this line the execution was aborted
// process.exit(1);

global.name = 'Tomas';
global.age = '30';
global.year = 2023;

console.log('Global variable age:', global.age);
