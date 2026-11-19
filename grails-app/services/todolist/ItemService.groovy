package todolist

import grails.gorm.transactions.Transactional
import groovy.transform.CompileStatic


@CompileStatic
@Transactional(readOnly = true)
class ItemService {

    List<Item> list(Map params) {
        Item.list(params)
    }

    Long count() {
        Item.count()
    }

}