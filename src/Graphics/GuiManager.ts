import { IServerConnectionObserver, IServerPollingObserver } from "../Communication/Communicators/Interfaces";
import { ServerPollingResponse } from "./Utils/JsonResponses";
 
export class GuiManager implements IServerConnectionObserver, IServerPollingObserver{
    onServerPolling(response: ServerPollingResponse): void {
        console.log("viva il polling");
    }
    onServerConnectionDown(): void {
        console.log("connessione DOWN");
    }
    onServerConnectionUp(): void {
        console.log("connessione UP");
    }
}