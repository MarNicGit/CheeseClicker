import { Clicky } from "./clicky";
import { SaveController } from "./saveController";

var root = document.documentElement;

var saveController = new SaveController();
var game = new Clicky(saveController);
saveController.loadGame(game);
console.log('welcome to clicky game pls enjoy');
game.init();
