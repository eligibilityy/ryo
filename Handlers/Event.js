function HandleEvent(client) {
    const fs = require('fs')
    const chalk = require('chalk')

    const folders = fs.readdirSync('./Events/')
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter(file => file.endsWith('.js'))
    
        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`)

            if (event.rest) {
                if(event.once) client.rest.once(event.name, (...args) => event.execute(...args))
                else client.rest.on(event.name, (...args) => event.execute(...args))
            } else {
                if(event.once) client.on(event.name, (...args) => event.execute(...args))
                else client.on(event.name, (...args) => event.execute(...args))
            }
            console.log(chalk.yellow(`[LOADER] Loaded event ${chalk.white(event.name)} from ${chalk.white(file)}`))    
            continue;
        }
    }
    return console.log(chalk.green('[LOADER] Loaded all events!'))
}

module.exports = { HandleEvent }
