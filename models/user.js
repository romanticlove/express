const fs = require('fs');
const usersFile = __dirname + '/../data/users.json';

function getDataFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(usersFile, 'utf8', (err, data) => {
            try {
                if (err)
                    return reject(err);

                data = JSON.parse(data);
                return resolve(data);
            } catch (e) {
                console.log(e);
                return reject(e);
            }
        });
    })

}
function writeDataIntoFile(data) {
    return new Promise((resolve, reject) => {
        if(typeof data === 'object')
            data = JSON.stringify(data);
        fs.writeFile(usersFile, data, (err) => {
                if (err)
                    return reject(err);

                return resolve();
            }
        );
    })

}
class User {
    static getFields() {
        return ['id', 'firstName', 'lastName', 'email', 'password', 'meta']
    };

    constructor(data) {
        this.data = data;
    }

    async create() {
        try {
            let fileData = await getDataFromFile();
            this.data.id = this.data.id || this.generateId(fileData);
            fileData.push(this.data);
            return await writeDataIntoFile(fileData);
        } catch (err) {
            throw err;
        }
    }

    getSafeData() {
        let safeData = Object.assign({},this.data);
        delete safeData.password;
        delete safeData.token;
        return safeData;
    }

    validate() {

    }

    generateId(fileData) {
        if(!fileData.length)
            return 1;

        let maxId = Math.max.apply(Math,fileData.map(function(o){return o.id;}));
        maxId++;
        return maxId;
    }

    static async getUserById(id) {
        try {
            let fileData = await getDataFromFile();
            let user = fileData.find(user => {
                    return user.id === id
                });

            if(!user)
                throw new Error('User not found');

            return (new User(user)).getSafeData();
        } catch (err) {
            throw err;
        }
    }

    static async updateUserBy(id, data) {
        try {
            let fileData = await getDataFromFile();
            let userIndex = fileData.findIndex(user => {
                return user.id === id
            });

            if(!userIndex)
                throw new Error('User not found');

            fileData[userIndex] = Object.assign(fileData[userIndex], data);
            await writeDataIntoFile(fileData);
            return (new User(fileData[userIndex])).getSafeData();
        } catch (err) {
            throw err;
        }
    }

    static async deleteUserById(id) {
        try {
            let fileData = await getDataFromFile();
            let userIndex = fileData.findIndex(user => {
                return user.id === id
            });

            if(userIndex === undefined)
                throw new Error('User not found');

            fileData.splice(userIndex,1);
            return await writeDataIntoFile(fileData);
        } catch (err) {
            throw err;
        }
    }
    static async getAllUsers() {
        try {
            let fileData = await getDataFromFile();
            return fileData.map(user => {
                    user = new User(user);
                    return user.getSafeData();
                }) || [];
        } catch (err) {
            throw err;
        }
    }

    static async findByEmailPassword(email, password) {
        try {
            let fileData = await getDataFromFile();
            let user = fileData.find(user => user.email === email && user.password === password)
            return user || null;
        } catch (err) {
            return null;
        }
    }
}

module.exports = User;