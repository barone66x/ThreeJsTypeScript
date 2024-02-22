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

export interface IServerInitialConfigObserver {
  onInitialConfig(response: InitialConfigResponse): void;
}

export interface IServerConnectionObserver {
  onServerConnectionUp(): void;
  onServerConnectionDown(): void;
}

export interface IServerPollingObserver {
  onServerPolling(response: ServerPollingResponse): void;
}

export interface IRTLSCommunicator {
  subscribeToPolling(obs: IRTLSPollingObserver): void;
  subscribeToConnection(obs: IRTLSConnectionObserver): void;
  pollingRequest(request: RTLSPollingRequest): Promise<RTLSPollingResponse>;

  notifyConnectionUp(): void;
  notifyConnectionDown(): void;
  notifyPolling(response: RTLSPollingResponse): void;
}
export interface IRTLSPollingObserver {
  onRTLSPolling(response: RTLSPollingResponse): void;
}

export interface IRTLSConnectionObserver {
  onRTLSConnectionUp(): void;
  onRTLSConnectionDown(): void;
}
