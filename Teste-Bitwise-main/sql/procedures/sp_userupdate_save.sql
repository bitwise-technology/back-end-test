DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usersupdate_save`(
piduser INT,
pname VARCHAR(30),
plastName VARCHAR(30),
plogin VARCHAR(30),
ppassword VARCHAR(256), 
pemail VARCHAR(128),
pgender INT,
padmin TINYINT
)
BEGIN
	
    DECLARE vidperson INT;
    
	SELECT idperson INTO vidperson
    FROM tb_users
    WHERE iduser = piduser;
    
    UPDATE tb_persons
    SET name = pname, lastName = plastName, email = pemail, gender = pgender
	WHERE idperson = vidperson;
    
    UPDATE tb_users
    SET login = plogin, password = ppassword, admin = padmin
	WHERE iduser = piduser;
    
    SELECT b.idperson, b.name, b.lastName, b.email, b.gender,
        a.iduser, a.login, a.password, a.admin, a.dtregister
    FROM tb_users a INNER JOIN tb_persons b USING(idperson) WHERE a.iduser = piduser;
    
END ;;
DELIMITER ;