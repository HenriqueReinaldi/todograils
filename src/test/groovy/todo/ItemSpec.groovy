package todo

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class ItemSpec extends Specification implements DomainUnitTest<Item> {

     void "test domain constraints"() {
        when:
        Item domain = new Item()
        //TODO: Set domain props here

        then:
        domain.validate()
     }
}
