package todolist

import grails.converters.JSON


class ItemController {
    ItemService itemService

//    poarams sao da query string /endpoint?max=10&sort=prioridade ...
//    def index(Integer max, String sort, String order) {
//        params.max = Math.min(max ?: 10, 100)
//        params.sort = sort ?: "prioridade"
//        params.order = order ?: "asc"
//
//        List<Item> items = itemService.list(params)
//
//        render items as JSON
//    }

    def index() {
        //params.max = Math.min(params.int('max') ?: 10, 100)
        params.sort = params.sort ?: "prioridade"
        params.order = params.order ?: "asc"

        List<Item> items = itemService.list(params)

        render items as JSON
    }

    def novo() {
        Item item = itemService.novo(request.JSON as Map)
        if (item) {
             render status: 201, text: (item as JSON), contentType: 'application/json'
        } else {
            render status: 400, text: "deu ruim..."
        }
    }

    def atualizar(Integer id) {
        boolean status = itemService.atualizar(request.JSON as Map, id)
        if (status) {
            render status: 200, text: "atualiozado!"
        } else {
            render status: 400, text: "deu ruim..."
        }
    }

    def remover(Integer id){
        boolean status = itemService.remover(id)
        if (status) {
            render status: 200, text: "eviscerado!!!"
        } else {
            render status: 400, text: "deu ruim..."
        }
    }


}