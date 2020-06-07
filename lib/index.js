"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feathersIpSocketIO = exports.feathersIp = void 0;
// Source code based on discussion:
// https://github.com/feathersjs-ecosystem/primus/issues/46
function feathersIp(ipPropertyName) {
    return function (req, res, next) {
        req.feathers = req.feathers || {};
        req.feathers[ipPropertyName || 'ip'] = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip;
        next();
    };
}
exports.feathersIp = feathersIp;
function feathersIpSocketIO(io, ipPropertyName) {
    io.on('connection', function (socket) {
        socket.feathers = socket.feathers || {};
        var headers = socket.handshake.headers;
        socket.feathers[ipPropertyName || 'ip'] = headers['x-forwarded-for'] || headers['x-real-ip'] || socket.conn.remoteAddress;
    });
}
exports.feathersIpSocketIO = feathersIpSocketIO;
