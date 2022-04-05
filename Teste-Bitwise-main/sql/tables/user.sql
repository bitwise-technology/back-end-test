CREATE TABLE tb_users (
    iduser INT UNSIGNED NOT NULL AUTO_INCREMENT,
    idperson INT UNSIGNED NOT NULL,
    login varchar(30) UNIQUE NOT NULL,
    password varchar(256) NOT NULL,
    admin tinyint(4) NOT NULL DEFAULT 0,
    dtregister timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (iduser),
    KEY FK_users_persons_idx (idperson),
    CONSTRAINT fk_users_persons FOREIGN KEY (idperson) REFERENCES tb_persons (idperson) ON DELETE NO ACTION ON UPDATE NO ACTION
);
