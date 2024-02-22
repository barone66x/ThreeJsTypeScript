import {
  InitialConfigRequest,
  InitialConfigResponse,
  RTLSPollingRequest,
  RTLSPollingResponse,
  ServerPollingRequest,
  ServerPollingResponse,
} from "../../Graphics/Utils/JsonResponses";
 
export interface IServerCommunicator {
  initRequest(request: InitialConfigRequest): Promise<InitialConfigResponse>;
  pollingRequest(request: ServerPollingRequest): Promise<ServerPollingResponse>;
 
  subscribeToConnection(obs: IServerConnectionObserver): void;
  subscribeToPolling(obs: IServerPollingObserver): void;
  subscribeToInitialConfig(obs: IServerInitialConfigObserver): void;
 
  notifyConnectionUpObserver(): void;
  notifyConnectionDownObserver(): void;
  notifyInitialObserver(response: InitialConfigResponse): void;
  notifyPollingObserver(response: ServerPollingResponse): void;
}
 
 
export interface IServerInitialConfigObserver{
    onInitialConfig(response: InitialConfigResponse) : void;
}
 
export interface IServerConnectionObserver{
    onServerConnectionDown() : void;
    onServerConnectionUp() : void;
}
 
export interface IServerPollingObserver{
    onServerPolling(response: ServerPollingResponse) : void;
}
 
 
 
export interface IRTLSCommunicator{
    subscribeToPolling(obs: IRTLSPollingObserver): void;
    pollingRequest(request: RTLSPollingRequest) : Promise<RTLSPollingResponse>;
}
export interface IRTLSPollingObserver{
    onRTLSPolling(response: RTLSPollingResponse): void;
}