

CREATE OR REPLACE PROCEDURE RelacionarRevisor(P_DPI IN NUMBER, P_NOMBRES IN VARCHAR,
                                              P_APELLIDOS IN VARCHAR,
                                              P_EMAIL IN VARCHAR, P_DIRECCION IN VARCHAR,
                                              P_TELEFONO IN NUMBER, P_CV IN VARCHAR,
                                              P_FECHA IN VARCHAR, P_ID_PUESTO IN NUMBER,
                                              P_ID_DEPARTAMENTO IN NUMBER)
IS
    revisor NUMBER;
BEGIN
    select REVISOR_EXPEDIENTES.ID_REVISOR_EXPEDIENTES into revisor
    from REVISOR_EXPEDIENTES
    inner join USUARIO on REVISOR_EXPEDIENTES.ID_USUARIO = USUARIO.ID_USUARIO
    group by CANTIDAD_EXP, USUARIO.ID_DEPARTAMENTO, USUARIO.ESTADO, ID_REVISOR_EXPEDIENTES, P_ID_DEPARTAMENTO
    having USUARIO.ID_DEPARTAMENTO = P_ID_DEPARTAMENTO
    and USUARIO.ESTADO = 1
    ORDER BY CANTIDAD_EXP ASC
    fetch next 1 rows only
    ;

    insert into EXPEDIENTE (DPI, NOMBRES, APELLIDOS, EMAIL, DIRECCION, TELEFONO, CV, REVISADO, CORREGIR,
                        FECHA_POST, ID_DEPARTAMENTO,ID_PUESTO, ID_REV_EXP, RECHAZADOS)
    values (P_DPI, P_NOMBRES, P_APELLIDOS, P_EMAIL, P_DIRECCION, P_TELEFONO, P_CV, 0, 2,
            TO_DATE(P_FECHA, 'DD/MM/YYYY'), P_ID_DEPARTAMENTO,P_ID_PUESTO, revisor, 0);

    update REVISOR_EXPEDIENTES
    set CANTIDAD_EXP = CANTIDAD_EXP + 1,
        TOTAL = TOTAL + 1
    where ID_REVISOR_EXPEDIENTES = revisor;

END RelacionarRevisor;




CREATE OR REPLACE PROCEDURE RechazarExp(E_EXP IN NUMBER, E_REVISOR_EXP IN NUMBER)
IS
BEGIN
    update EXPEDIENTE
    set REVISADO = 2
    where ID_EXPEDIENTE = E_EXP;


    update REVISOR_EXPEDIENTES
    set CANTIDAD_EXP = CANTIDAD_EXP - 1
    where ID_REVISOR_EXPEDIENTES = E_REVISOR_EXP;

END RechazarExp;


CREATE OR REPLACE PROCEDURE AceptarExp(E_EXP IN NUMBER, E_REVISOR_EXP IN NUMBER, U_DPI in VARCHAR,
                                       U_PASSWORD IN VARCHAR, U_FECHA IN VARCHAR)
IS
    usuarioN NUMBER;
BEGIN

    update EXPEDIENTE
    set REVISADO = 1
    where ID_EXPEDIENTE = E_EXP;


    update REVISOR_EXPEDIENTES
    set CANTIDAD_EXP = CANTIDAD_EXP - 1
    where ID_REVISOR_EXPEDIENTES = E_REVISOR_EXP;

    insert into USUARIO (USERNAME, PASSWORD, FECHA_INI, ESTADO, ID_ROL)
    values (U_DPI, U_PASSWORD, TO_DATE(U_FECHA, 'DD/MM/YYYY'), 1, 4);

    select USUARIO.ID_USUARIO into usuarioN
    from USUARIO
    where USUARIO.USERNAME = U_DPI
    and USUARIO.PASSWORD = U_PASSWORD;

    update EXPEDIENTE
    set EXPEDIENTE.ID_USUARIO = usuarioN
    where EXPEDIENTE.ID_EXPEDIENTE = E_EXP;
END AceptarExp;


CREATE OR REPLACE PROCEDURE CargarReq(D_NOMBRE IN VARCHAR, D_FECHA IN VARCHAR,
                                      D_LINK IN VARCHAR, D_EXP IN NUMBER)
IS
    cnt NUMBER;
BEGIN
    SELECT COUNT(*) INTO cnt
    FROM DOCUMENTO D
    WHERE D.NOMBRE_DOCUMENTO = D_NOMBRE
    and D.ID_EXPEDIENTE = D_EXP;

    IF cnt = 0 THEN

        insert into DOCUMENTO (NOMBRE_DOCUMENTO, ACEPTADO, FECHA, LINK_DESCARGA, ID_EXPEDIENTE)
        values (D_NOMBRE, 2, TO_DATE(D_FECHA, 'DD/MM/YYYY'), D_LINK, D_EXP);

    ELSE
        update DOCUMENTO
        set ACEPTADO = 2, FECHA = TO_DATE(D_FECHA, 'DD/MM/YYYY'), LINK_DESCARGA = D_LINK
        where ID_DOCUMENTO = (
            select ID_DOCUMENTO
            from DOCUMENTO
            where  NOMBRE_DOCUMENTO = D_NOMBRE
            and ID_EXPEDIENTE = D_EXP
            );
    END IF;
END CargarReq;


CREATE OR REPLACE PROCEDURE CorregirExp(D_ID_DOC IN NUMBER, D_ACCEPT IN NUMBER,
                                      D_EXP IN NUMBER)
IS
    cnt1 NUMBER;
    cnt2 NUMBER;

BEGIN
    SELECT COUNT(*) into cnt1
    FROM PUESTO_REQUISITO PR
    INNER JOIN EXPEDIENTE E on PR.ID_PUESTO = E.ID_PUESTO
    WHERE PR.ID_PUESTO = E.ID_PUESTO
    and E.ID_EXPEDIENTE = D_EXP
    ;

    update DOCUMENTO
    set ACEPTADO = D_ACCEPT
    where ID_DOCUMENTO = D_ID_DOC;

    if D_ACCEPT = 0 THEN
        update EXPEDIENTE
        set RECHAZADOS = RECHAZADOS + 1
        where ID_EXPEDIENTE = D_EXP;
    end if;


    SELECT COUNT(*) INTO cnt2
    FROM DOCUMENTO
    WHERE ID_EXPEDIENTE = D_EXP
    and ACEPTADO = 1
    ;

    if cnt1 = cnt2 THEN
        update EXPEDIENTE
        set CORREGIR = 0
        where ID_EXPEDIENTE = D_EXP;
    end if;

END CorregirExp;



CREATE OR REPLACE PROCEDURE plantilla(P_ID_DEP IN NUMBER, P_ID_USER IN NUMBER,
                                      P_SALARIO IN NUMBER)
IS
BEGIN
    update USUARIO
    set ID_DEPARTAMENTO = P_ID_DEP
    where ID_USUARIO = P_ID_USER;

    update DEPARTAMENTO
    set CAPITAL_DEPARTAMENTO = CAPITAL_DEPARTAMENTO - P_SALARIO
    where ID_DEPARTAMENTO = P_ID_DEP;

END plantilla;




CREATE OR REPLACE PROCEDURE eliminarPlantilla(P_ID_DEP IN NUMBER, P_ID_USER IN NUMBER,
                                      P_SALARIO IN NUMBER)
IS
BEGIN
    update USUARIO
    set ID_DEPARTAMENTO = null
    where ID_USUARIO = P_ID_USER;

    update DEPARTAMENTO
    set CAPITAL_DEPARTAMENTO = CAPITAL_DEPARTAMENTO + P_SALARIO
    where ID_DEPARTAMENTO = P_ID_DEP;

END eliminarPlantilla;