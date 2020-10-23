import { Game } from "./game";
import { SaveController } from "./controllers/saveController";

var saveController = new SaveController();
var game = new Game(saveController);
