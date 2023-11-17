#include "crow.h"
#include "server.h"

int server()
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/ws")
        .websocket()
        .onopen([&](crow::websocket::connection& conn){
                CROW_LOG_INFO << "new websocket connection";
                conn.send_text(std::string("You are connected to the socket!"));
                })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason){
                conn.send_text(std::string("You closed the socket!"));
                CROW_LOG_INFO << "websocket connection closed: " << reason;
                })
        .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary){
                CROW_LOG_INFO << "websocket message: " << data;
                conn.send_text(std::string("Howdy"));
                });

    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    app.port(18080).run();
    return 0;
}
