const PROTO_PATH = './service.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
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
const stub = new protoDescriptor.RouteGuide('localhost:50051', grpc.credentials.createInsecure());

var body = {name: 'fawzi'};;
const call = stub.getFeature(body);
call.on('data', async function(res) {
   console.log(res);
});
call.on('end', function () {
    console.log("finish");
});