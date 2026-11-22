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
        Item.createCriteria().list(params) {
            if (params.status) {
                eq('status', params.status)
            }
            if (params.prioridade) {
                eq('prioridade', params.prioridade as Integer)
            }
            if (params.categoria) {
                eq('categoria', params.categoria)
            }
        } as List<Item>
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
            Map<String, Object> propriedades = params.subMap(propriedades_nomes)

            if (propriedades.containsKey('termino')) {
                if (propriedades.termino == "") propriedades.termino = null
                else propriedades.termino = LocalDate.parse(propriedades.termino as String)
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