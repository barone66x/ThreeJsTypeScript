import { IRTLSCommunicator, IServerCommunicator } from "./Communication/Communicators/Interfaces";
import { ISceneManager } from "./Graphics/ISceneManager"
import { InitialConfigRequest } from "./Graphics/Utils/JsonResponses";

export class RunnerFGS{

    private rtlsCommunicator: IRTLSCommunicator;
    private serverCommunicator: IServerCommunicator;

    private sceneManager: ISceneManager;

    constructor(rtlsCommunicator: IRTLSCommunicator, serverCommunicator: IServerCommunicator, sceneManager: ISceneManager) {
        this.rtlsCommunicator = rtlsCommunicator;
        this.serverCommunicator = serverCommunicator;

        this.sceneManager = sceneManager;
    }

    public init(): void {
        const serverReq : InitialConfigRequest = {}; 

        this.serverCommunicator.initRequest(serverReq);
        this.sceneManager.init();
    }

    private serverPolling() {

    }

}