CREATE TABLE item (
     id BIGSERIAL PRIMARY KEY,
     nome VARCHAR(50) NOT NULL,
     descricao VARCHAR(500),
     categoria VARCHAR(50),
     status VARCHAR(20) DEFAULT 'TODO' NOT NULL,
     termino DATE,
     prioridade INTEGER DEFAULT 1 NOT NULL,
     version BIGINT NOT NULL,
     CONSTRAINT chk_item_prioridade CHECK (prioridade >= 1 AND prioridade <= 5),
     CONSTRAINT chk_item_status CHECK (status IN ('TODO', 'DOING', 'DONE'))
);