/// <reference types="socket.io" />
import { RequestHandler } from 'express';
export declare function feathersIp(ipPropertyName?: string): RequestHandler;
export declare function feathersIpSocketIO(io: SocketIO.Server, ipPropertyName?: string): void;
