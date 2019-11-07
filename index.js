const fs = require('fs');
const faker = require('faker');

function getRandomEmailDomain(firstName, lastName) {
    const provider = faker.internet.domainName();
    const email = faker.internet.email(firstName, lastName, provider);
    return email.toLowerCase();
}

async function createFakeDataTest(recordCount) {
    const fileNameFake = `customer_${recordCount}.csv`;
    const f = fs.createWriteStream(fileNameFake);
    f.write('id,name,email,phone\n');

    //looping for generating data
    for (let i = 0; i < recordCount; i++) {
        const id = faker.random.uuid();

        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const name = `${firstName} ${lastName}`;

        const email = getRandomEmailDomain(firstName, lastName);

        const phone = faker.phone.phoneNumber();

        f.write(`${id},${name},${email},${phone}\n`);
    }

    console.log(`Created file ${fileNameFake} with records number ${recordCount}`);
}

// execute the command `node index.js <number_records_be_like>`
const recordCount = parseInt(process.argv[2]);
if (process.argv.length != 3 || recordCount < 1 || isNaN(recordCount)) {
    console.error(`Failed to generate fake data, try this, 'node index.js 100'`);
    process.exit(1);
}

createFakeDataTest(recordCount);