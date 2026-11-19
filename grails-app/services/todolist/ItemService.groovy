package todolist

import grails.gorm.transactions.Transactional
import groovy.transform.CompileStatic
import org.apache.tools.ant.taskdefs.Local

import java.time.LocalDate

/*
GORMS:
failOnError = bool: erros de validacao jogam excecoiseis
flush = bool : mudancas do banco de dados são executadas imediatamenet

save() -> persiste no banco um objeto. (CRIA se necessario)
delete() -> adivinha
count() -> idem
get(id) -> retorna objeto se no banco existir // null
read(id) -> retorna objeto EM MODO LEITURA // null
findbyCat // findByCatANDCat() -> busca por catetgoras, retornando primeiro resultado
findAllby... mesma coisa de cima, só que todos resulttados
* */

@CompileStatic
@Transactional(readOnly = false)
class ItemService {

    List<Item> list(Map params) {
        Item.list(params)
    }

    Long count() {
        Item.count()
    }

    Item novo(Map params) {
        try {
            Item item = new Item(params)
            item.save(failOnError: true, flush: true)
            return item
        }
        catch (Exception e) {
            e.printStackTrace()
            return null
        }
    }

    boolean atualizar(Map params, Integer id) {
        try {
            Item item = Item.get(id)
            if (item == null) {
                return false
            }

            List<String> propriedades_nomes = ['nome', 'descricao', 'categoria', 'status', 'termino', 'prioridade']
            Map<String, String> propriedades = params.subMap(propriedades_nomes) as Map<String, String>

            if (propriedades.containsKey('termino')) {
                propriedades.termino = LocalDate.parse(propriedades.termino)
            }

            if (propriedades.containsKey('prioridade')) {
                propriedades.prioridade = propriedades.prioridade as Integer
            }

            item.properties.putAll(propriedades)
            item.save(failOnError: true, flush: true)
            return true
        } catch (Exception e) {
            e.printStackTrace()
            return false
        }
    }

    boolean remover(Integer id) {
        try {
            Item item = Item.get(id)
            item.delete(failOnError: true, flush: true)
            return true
        } catch (Exception e) {
            e.printStackTrace()
            return false
        }
    }


}