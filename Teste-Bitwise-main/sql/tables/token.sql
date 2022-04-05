CREATE TABLE tokens (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT UNSIGNED NOT NULL,
    token VARCHAR(1000) NOT NULL,
    refresh_token VARCHAR(1000) NOT NULL,
    expired_at DATETIME NOT NULL,
    active TINYINT UNSIGNED NOT NULL DEFAULT 1,
    CONSTRAINT fk_tokens_tb_users 
        FOREIGN KEY (usuarios_id) REFERENCES tb_users(iduser)
);