import { Clicky } from "./clicky";
import { GuiController } from "./controllers/guiController";
import { SaveController } from "./controllers/saveController";

var root = document.documentElement;

var saveController = new SaveController();
var game = new Clicky(saveController);
var guiController = new GuiController(game);

game.init();
console.log('welcome to clicky game pls enjoy');

