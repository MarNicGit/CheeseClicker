import { Clicky } from "./clicky";
import { SaveController } from "./saveController";

var root = document.documentElement;

var saveController = new SaveController();
var game = new Clicky(saveController);
console.log('welcome to clicky game pls enjoy');
game.init();
