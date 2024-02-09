import "./style.css";

import { SceneManager } from "./Graphics/SceneManager";

import { RunnerFGS } from "./RunnerFGS";
import { RTLSCommunicator, ServerCommunicator } from "./Communication/Communicators/MockCommunicators";

const rtlsCommunicator = new RTLSCommunicator();
const serverCommunicator = new ServerCommunicator();
const sceneManager = new SceneManager();

const client = new RunnerFGS(rtlsCommunicator, serverCommunicator, sceneManager);