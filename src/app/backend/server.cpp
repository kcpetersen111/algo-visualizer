#include "crow.h"

int main()
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/ws")
        .websocket()
        .onopen([&](crow::websocket::connection& conn){
                CROW_LOG_INFO << "new websocket connection";
                })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason){
                CROW_LOG_INFO << "websocket connection closed: " << reason;
                })
        .onmessage([&](crow::websocket::connection& /*conn*/, const std::string& data, bool is_binary){
                CROW_LOG_INFO << "websocket message: " << data;
                });

    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    app.port(18080).run();
}
