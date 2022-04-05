DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_users_delete`(
piduser INT
)
BEGIN
	
    DECLARE vidperson INT;
    
	SELECT idperson INTO vidperson
    FROM tb_users
    WHERE iduser = piduser;

    DELETE FROM tokens WHERE usuarios_id = piduser;
    DELETE FROM tb_users WHERE iduser = piduser;
    DELETE FROM tb_persons WHERE idperson = vidperson;
    
END ;;
DELIMITER ;