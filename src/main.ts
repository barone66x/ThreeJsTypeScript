import "./style.css";

import { SceneManager } from "./Graphics/SceneManager";

import { RunnerFGS } from "./RunnerFGS";
import { ServerCommunicator, RTLSCommunicator } from "./Communication/Communicators/MockCommunicators";
import { GuiManager } from "./Graphics/GuiManager";

const rtlsCommunicator = new RTLSCommunicator();
const serverCommunicator = new ServerCommunicator();
const sceneManager = new SceneManager();
const guiManager = new GuiManager();

const client = new RunnerFGS(rtlsCommunicator, serverCommunicator, sceneManager, guiManager);
