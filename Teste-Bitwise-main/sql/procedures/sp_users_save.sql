DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_users_save`(
pname VARCHAR(30),
plastName VARCHAR(30), 
plogin VARCHAR(30), 
ppassword VARCHAR(256), 
pemail VARCHAR(128), 
pgender tinyint,
padmin TINYINT
)
BEGIN
	
    DECLARE vidperson INT;
    
	INSERT INTO tb_persons (name, lastName, email, gender)
    VALUES(pname, plastName, pemail, pgender);
    
    SET vidperson = LAST_INSERT_ID();
    
    INSERT INTO tb_users (idperson, login, password, admin)
    VALUES(vidperson, plogin, ppassword, padmin);
    
    SELECT b.idperson, b.name, b.lastName, b.email, b.gender,
        a.iduser, a.login, a.password, a.admin, a.dtregister
    FROM tb_users a INNER JOIN tb_persons b USING(idperson) WHERE a.iduser = LAST_INSERT_ID();
    
END ;;
DELIMITER ;