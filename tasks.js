
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  process.on('exit', () => {saveDataToFile('database.json', tasks)})
  process.on('load', () => {loadDataFromFile('database.json')})
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

function saveDataToFile(fileName, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, jsonData);
    console.log(`Data saved to ${fileName}`);
  } catch (err) {
    console.error(`Error saving data to ${fileName}: ${err}`);
  }
}


function loadDataFromFile(fileName) {
  try {
    const jsonData = fs.readFileSync(fileName, 'utf8');
    tasks = JSON.parse(jsonData);
    console.log(`Data loaded from ${fileName}`);
  } catch (err) {
    console.error(`Error loading data from ${fileName}: ${err}`);
  }
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const input = text.trim()
  const parts = input.split(' ')
  const command = parts[0]
  const argument = parts.slice(1).join(' ')

  if (command === 'quit' || command === 'exit') {
    quit();
  }
  else if (command === 'hello') {
    hello(argument);
  }
  else if (command === 'help') {
    help();
  }
  else if (command === 'list') {
    list()
  }
  else if (command === 'add') {
    add(argument);
  }
  else if (command === 'remove') {
    remove(argument);
  }
  else if (command === 'edit') {
    edit(argument);
  }
  else if (command === 'check') {
    check(argument);
  }
  else if (command === 'uncheck') {
    uncheck(argument);
  }
  else {
    unknownCommand(input);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}

/**
 * Array of Tasks
 *
 * @returns {void}
 */


/**
 * Says hello alone or with an additional word
 *
 * @returns {void}
 */
function hello(name) {
  if (name) {
    console.log(`hello ${name}!`);
  } else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log('hello\n quit\n exit\n help\n hello [name]\n list\n add [anything]\n remove\n remove [index]\n check\n check [index]\n uncheck\n uncheck [index]\n')
}

const fs = require('fs')
const arr = ["say Hello", "say hello to someone or anything", "type help to check out the commands", "type exit or quit to get out of tasks"]

/**
 * Lists all the tasks
 *
 * @returns {void}
 */
function list(check) {
  for (let i = 0; i < arr.length; i++) {
    if (!check())
      console.log('[] ' + (i + 1) + "- " + arr[i])
    else
      console.log('[✓] ' + (i + 1) + "- " + arr[i])
  }
}

/**
 * Adds tasks to the list
 *
 * @returns {void}
 */
function add(text) {
  if (text === "" || text === " ")
    console.log('Error!')
  else
    arr.push(text.toUpperCase())
  console.log(arr)
}

/**
 * Remove tasks from the list
 *
 * @returns {void}
 */
function remove(index) {
  for (let i = 0; i < arr.length; i++) {
    if (index === undefined)
      arr.pop()
    else if (index - 1 !== i)
      console.log(index + " does not exist!")
    else
      arr.splice(index - 1, 1)
  }
  console.log(arr)
}

/**
 * Edit the tasks
 *
 * @returns {void}
 */
function edit(text) {
  array = text.split(' ')
  for (let i = 0; i < arr.length; i++) {
    if (text === undefined)
      console.log('Error!')
    else if (Number(array[i]) === i + 1)
      arr[i].replace(arr[i], text)
    else
      arr[i].replace(arr[arr.length - 1], text)
  }
  list()
}

/**
 * Check the tasks
 *
 * @returns {void}
 */
function check(index){
  let done
  if (!index)
    return 'Error!'
  else {
    for (let i=0; i<arr.length; i++) {
      if (Number(index) === i + 1)
        done = true
      else
        done = false
    }
 }
 return done
}

/**
 * Uncheck the tasks
 *
 * @returns {void}
 */
function uncheck(index){
  return !check(index)
}



// The following line starts the application
startApp("Abdulrahman Ghassa")
