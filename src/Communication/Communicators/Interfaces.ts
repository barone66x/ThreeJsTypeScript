import { InitialConfigRequest, InitialConfigResponse, RTLSPollingRequest, RTLSPollingResponse, ServerPollingRequest, ServerPollingResponse } from "../../Graphics/Utils/JsonResponses";

export interface IServerCommunicator{
    initRequest(request: InitialConfigRequest) : Promise<InitialConfigResponse>;
    pollingRequest(request: ServerPollingRequest) : Promise<ServerPollingResponse>;
}

export interface IRTLSCommunicator{
    pollingRequest(request: RTLSPollingRequest) : Promise<RTLSPollingResponse>;
}