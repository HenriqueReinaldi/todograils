package todolist

import java.time.LocalDate

class Item {
    String nome, descricao, categoria
    String status = "TODO"
    LocalDate termino
    Integer prioridade = 1

    static constraints = {
        prioridade min: 1, max: 5, nullable: false
        nome blank: false, nullable: false, maxSize: 50
        status nullable: false, blank: false, inList: ["TODO", "DOING", "DONE"]
        descricao nullable: true, maxSize: 500
        categoria nullable: true, maxSize: 50
        termino nullable: true

    }
}