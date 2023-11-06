const PROTO_PATH = './service.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

function getFeature(call) {
    for ( let i = 0; i < 10; i++) {
        call.write({ result: call.request.name })
    }
    call.end();
}

function getServer() {
    const server = new grpc.Server();
    server.addService(protoDescriptor.RouteGuide.service, {
        GetFeature: getFeature,
    });
    return server;
}

const routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(`Error binding server: ${error}`);
    } else {
        routeServer.start();
        console.log(`Server started on port ${port}`);
    }
});