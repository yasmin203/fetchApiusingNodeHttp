const fs = require('fs');
const yargs = require('yargs')
const myUserValidador = require('./CheckUsers');
//read from file
const readUsers = () => {
    let users
    try {
        users = JSON.parse(fs.readFileSync('users.json'))
        if (!Array.isArray(users)) throw new Error()
    }
    catch (error) {
        users = []
    }
    return users
}

const readUserByID = (id) => {
    let all = readUsers()
    let userInd = all.findIndex(user => user.id == id)
    if (userInd == -1) {
        return false
    }
    return String(userInd)
}
//write to file
const writeUser = (user) => {
    if (myUserValidador.isEmail(user.email) && myUserValidador.isId(user.id, readUserByID(user.id)) && myUserValidador.isName(user.name) && myUserValidador.isJob(user.job)) {
        let all = readUsers()
        all.push(user)
        fs.writeFileSync('users.json', JSON.stringify(all))
        return console.log('Added successfully!');
    }

}
const saveData = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users))
}
//add user yarg
yargs.command({
    command: 'addUser',
    builder: {
        id: {
            type: "string",
            demandOption: true
        },
        name: {
            type: "string",
            demandOption: true
        },
        job: {
            type: "string",
            demandOption: true
        },
        email: {
            type: "string",
            demandOption: true
        }
    },
    handler(argv) {
        user = {
            id: argv.id,
            name: argv.name,
            job: argv.job,
            email: argv.email,
            tasks: []
        }
        writeUser(user)
    }
})

//add task to user yarg
yargs.command({
    command: 'addTask',
    builder: {
        id: {
            type: 'string',
            demandOption: true
        },
        name: {
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        let task = {
            name: argv.name
        }
        let userIndex = readUserByID(argv.id)
        if (!userIndex) {
            return console.log('No user with this name');
        }
        let users = readUsers()
        users[Number(userIndex)].tasks.push(task)
        saveData(users)
        console.log('Task added successfully');
    }
})

// delete task from user yarg
yargs.command({
    command: 'deleteTask',
    builder: {
        id: {
            type: 'string',
            demandOption: true
        },
        name: {
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        let userIndex = readUserByID(argv.id)
        if (!userIndex) {
            return console.log('Not Found ')
        }
        let users = readUsers()
        let tasks = users[Number(userIndex)].tasks.filter(task => task.name != argv.name)
        if (tasks.length == users[Number(userIndex)].tasks.length) {
            return console.log('no task found');
        }
        users[Number(userIndex)].tasks = tasks
        saveData(users)
        console.log('Deleted successfully!');
    }
})

//search user
yargs.command({
    command: 'getUser',
    builder: {
        id: {
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        let userIndex = readUserByID(argv.id)
        if (!userIndex) {
            return console.log('Not Found ')
        }
        let user = readUsers()[Number(userIndex)]
        if (!user) {
            return console.log('User is not found!');
        }
        console.log(user);
    }
})

//show all users
yargs.command({
    command: 'getAllUsers',
    handler() {
        let users = readUsers()
        if (users.length == 0) {
            return console.log('No user to be shown');
        }

        console.log(users);
    }
})



//edit user
yargs.command({
    command: 'editUser',
    builder: {
        id: {
            type: 'string',
            demandOption: true
        },
        name: {
            type: "string"
        },
        job: {
            type: "string"
        },
        email: {
            type: "string"
        }
    },
    handler(argv) {
        let update = {
            id: argv.id,
            name: argv.name,
            job: argv.job,
            email: argv.email,
            tasks: []
        }
        let userIndex = readUserByID(argv.id)
        if (!userIndex) {
            return console.log('This user not found')
        }
        let users = readUsers()
        let user = users[Number(userIndex)]
        user.name = update.name || user.name
        user.job = update.job || user.job
        user.email = update.email || user.email
        if(!myUserValidador.isEmail(user.email) || !myUserValidador.isName(user.name) || !myUserValidador.isJob(user.job)){
            return 
        }
        users.splice(Number(userIndex), 1, user)
        saveData(users)
        console.log(user);
    }
})

// delete user
yargs.command({
    command: 'deleteUser',
    builder: {
        id: {
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        let userIndex = readUserByID(argv.id)
        if (!userIndex) {
            return console.log('not found ')
        }
        let users = readUsers()
        users.splice(Number(userIndex), 1)
        saveData(users)
        console.log('Deleted successfully!');
    }
})

yargs.argv