
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  else if(command === 'hello'){
    hello(argument);
  }
  else if(command === 'help'){
    help();
  }
  else if(command === 'list'){
    list();
  }
  else if(command === 'add'){
    add(argument);
  }
  else if(command === 'remove'){
    remove(argument);
  }
  else{
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
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

/**
 * Array of Tasks
 *
 * @returns {void}
 */
arr = ["say Hello", "say hello to someone or anything", "type help to check out the commands", "type exit or quit to get out of tasks"]


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
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help(){
  console.log('hello\n quit\n exit\n help\n hello [name]\n list\n add [anything]\n remove\n remove [index]\n')
}

/**
 * Lists all the tasks
 *
 * @returns {void}
 */
function list(){
  for (let i=0; i<arr.length; i++)
    console.log(i+1 + "- " + arr[i])
}

/**
 * Adds tasks to the list
 *
 * @returns {void}
 */
function add(text){
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
function remove(index){
  if (index === undefined)
    arr.pop()
  else
    arr.splice(index - 1, 1)
  console.log(arr)
}

// The following line starts the application
startApp("Abdulrahman Ghassa")
