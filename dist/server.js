import fastify from "fastify";
const server = fastify();
server.get("/auth", async (request, reply) => {
    const { username, password } = request.query;
    if (!username || !password) {
        throw new Error("Add a username and a password as query parameters so I can demo to you");
    }
    reply.code(200).send({ success: true, message: `${username} logged in` });
});
server.get("/ping", async (request, reply) => {
    return "pong\n";
});
server.listen({ port: 8080 }, (error, address) => {
    if (error) {
        console.error("Fatal start up error. Fix your shit and try again.", error);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
