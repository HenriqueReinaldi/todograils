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
        params.max = Math.min(params.int('max') ?: 10, 100)
        params.sort = params.sort ?: "prioridade"
        params.order = params.order ?: "asc"

        List<Item> items = itemService.list(params)

        render items as JSON
    }

    def novo() {
        def corpo = request.JSON


        render([teste: corpo.valor, metodo: corpo.metodo] as JSON)
    }
}