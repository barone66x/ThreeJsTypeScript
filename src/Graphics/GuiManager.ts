import { IRTLSConnectionObserver, IServerConnectionObserver, IServerPollingObserver } from "../Communication/Communicators/Interfaces";
import { ServerPollingResponse } from "./Utils/JsonResponses";
 
export class GuiManager implements IServerConnectionObserver, IServerPollingObserver, IRTLSConnectionObserver{
    
    onServerPolling(response: ServerPollingResponse): void {
        console.log("viva il polling");
    }
    onServerConnectionDown(): void {
        console.log("connessione DOWN del server");
    }
    onServerConnectionUp(): void {
        console.log("connessione UP del server");
    }

    onRTLSConnectionUp(): void {
        console.log("connessione UP di RTLS");

    }
    onRTLSConnectionDown(): void {
        console.log("connessione DOWN di RTLS");

    }
}