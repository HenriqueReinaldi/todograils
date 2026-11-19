package todo

class UrlMappings {
    static mappings = {
        "/item"(controller: "item", action: "index", method: "GET")
        "/item"(controller: "item", action: "novo", method: "POST")

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
