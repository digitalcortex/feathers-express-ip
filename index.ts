import { RequestHandler, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface FeathersRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
    feathers?: any;
}

interface FeathersSocket extends SocketIO.Socket {
    feathers?: any;
}

// Source code based on discussion:
// https://github.com/feathersjs-ecosystem/primus/issues/46

export function feathersIp (ipPropertyName?: string): RequestHandler {
    return (req: FeathersRequest, res, next) => {
        req.feathers = req.feathers || {};
        req.feathers[ipPropertyName || 'ip'] = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip;
        next();
    };
}

export function feathersIpSocketIO (io: SocketIO.Server, ipPropertyName?: string) {
    io.on('connection', function (socket: FeathersSocket) {
        socket.feathers = socket.feathers || {};
        const headers = socket.handshake.headers;
        socket.feathers[ipPropertyName || 'ip'] = headers['x-forwarded-for'] || headers['x-real-ip'] || socket.conn.remoteAddress;
    });
}