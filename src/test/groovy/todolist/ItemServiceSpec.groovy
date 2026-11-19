package todolist

import grails.testing.services.ServiceUnitTest
import spock.lang.Specification

class ItemServiceSpec extends Specification implements ServiceUnitTest<ItemService> {

     void "test something"() {
        expect:
        service.doSomething()
     }
}
