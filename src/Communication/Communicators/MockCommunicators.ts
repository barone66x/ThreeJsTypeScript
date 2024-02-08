import { InitialConfigRequest, InitialConfigResponse, RTLSPollingRequest, RTLSPollingResponse, ServerPollingRequest, ServerPollingResponse } from "../../Graphics/Utils/JsonResponses";
import { IRTLSCommunicator, IServerCommunicator } from "./Interfaces";

export class ServerCommunicator implements IServerCommunicator {
    public async initRequest(request: InitialConfigRequest): Promise<InitialConfigResponse> {
        return (await (await fetch("JsonExample/InitialConfigResponse.json")).json());
    }
    public async pollingRequest(request: ServerPollingRequest): Promise<ServerPollingResponse> {
        throw new Error("Method not implemented.");
    }

}

export class RTLSCommunicator implements IRTLSCommunicator{
    pollingRequest(request: RTLSPollingRequest): Promise<RTLSPollingResponse> {
        throw new Error("Method not implemented.");
    }
}