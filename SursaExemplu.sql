SET SERVEROUTPUT ON
/
CLEAR SCREEN
/
DECLARE
    v_conexiuneLaServer UTL_TCP.CONNECTION;
    v_octetiReturnati   BINARY_INTEGER;
    v_raspuns VARCHAR2(1000) := '';
    v_comandaDeTrimis VARCHAR2(1000);    
BEGIN
    
    -- cream o conexiune la server; acesta se afla local, ascultand la portul 8011; daca dupa maxim 10 secunde de cand conexiunea a fost verificata nu si-a modificat starea, o inchidem
    v_conexiuneLaServer := UTL_TCP.OPEN_CONNECTION(REMOTE_HOST => '127.0.0.1', REMOTE_PORT => 8011, TX_TIMEOUT => 10);
    
    v_comandaDeTrimis := 'SELECT nume, prenume FROM curieri';  -- setam comanda de trimis la server
    
    v_octetiReturnati := UTL_TCP.WRITE_LINE(v_conexiuneLaServer, v_comandaDeTrimis);    -- trimitem mesajul la server
    UTL_TCP.FLUSH(v_conexiuneLaServer);                                                 -- golim panza de scriere a conexiunii             
    
    BEGIN
        WHILE UTL_TCP.AVAILABLE(v_conexiuneLaServer, 10) > 0 LOOP                                      -- cat timp la fiecare 10 secunde s-a primit ceva la capatul conexiunii
            v_raspuns := v_raspuns ||  UTL_TCP.GET_LINE(v_conexiuneLaServer,TRUE);                   -- atasam pachetele de informatii primite concatenandu-le intr-o variabila
        END LOOP;
    EXCEPTION
        WHEN UTL_TCP.END_OF_INPUT THEN
            NULL;
    END;

    DBMS_OUTPUT.PUT_LINE('Response from Socket Server : ' || v_raspuns);                       -- afisam mesajul primit de la server
    
    UTL_TCP.CLOSE_CONNECTION(v_conexiuneLaServer);                                                             -- inchidem conexiunea
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20101, SQLERRM);
        UTL_TCP.CLOSE_CONNECTION(v_conexiuneLaServer);
END;
/