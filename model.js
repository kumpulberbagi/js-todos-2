'use strict'

///////////////////////////////////////////////////////////
///////////// global variable that means to get the message
///////////////////////////////////////////////////////////
const jf = require('jsonfile');
const file = './db/todo.json';
let args = require('./app.js');
let local = [jf.readFileSync(file)];

const commands = ["help","add", "show", "delete", "update", "show_by_status"];

const defaultMessage = `
<--Welcome to CLI to-do-list Application-->
1. ${commands[0]}
2. ${commands[1]} <add "your task">
3. ${commands[2]} <show "id" or "all">
4. ${commands[3]} <delete "id">
5. ${commands[4]} <update id "your task"> <status:true|false>
6. ${commands[5]} <show_by_status "true | false">\n
* Remember your space. This is CLI not GUI!\n`;

///////////////////////////////////////////////////////////
///////////// And of defined variable
///////////////////////////////////////////////////////////

module.exports = class Todo {
  constructor() {
    this.data_length = local.length;
  }

  static welcome(){
    console.log(defaultMessage);
  }

  static run(args) {
    switch(args[0]){
      case 'add' :
        args[1] === undefined ? Todo.welcome() : Todo.create({id:(this.data_length - 1), title: args[1], status: false});
        break;
      case 'delete' :
        args[1] === undefined ? Todo.welcome() : Todo.destroy_id(args[1]);
        break;
      case 'update' :
        args[1] === undefined ? Todo.welcome() : Todo.update_status(args[1], args[2]);
        break;
      case 'show':
        args[1] === undefined ? Todo.show_all() : Todo.show_id(args[1]);
        break;
      case 'show_by_status':
        args[1] === undefined ? Todo.show_all() : Todo.show_status(args[1]);
        break;
      default:
        Todo.welcome();
    }
  }

  //create

  static create(args) {
    jf.writeFileSync('./db/update.json', args);
    let updated = jf.readFileSync(file);
    local.push(updated);
    jf.writeFileSync(file, local);
    console.log("it's saved");
  }

  static destroy(id) {

  }

  static show_all() {
    local.map((value) => {
      console.log(`${value.id} [ ] task ${value.title}`);
    })
    // jf.readFile(file, (err, obj) => {
    //   console.log(`Task: ${obj.title} || Status: ${obj.status}`);
    // });
  }

  static show_id(id) {

  }

  static testing() {
  }

}
