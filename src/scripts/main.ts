import { Game } from "./game";
import { GuiController } from "./controllers/guiController";
import { SaveController } from "./controllers/saveController";

var root = document.documentElement;

var saveController = new SaveController();
var game = new Game(saveController);
var guiController = new GuiController(game);

game.init();
