package todo

class UrlMappings {
    static mappings = {
        "/item"(controller: "item", action: "index", method: "GET")
        "/item"(controller: "item", action: "novo", method: "POST")
        "/item/$id"(controller: "item", action: "atualizar", method: "PUT")
        "/item/$id"(controller: "item", action: "remover", method: "DELETE")

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
