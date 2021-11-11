--Puestos con lista de categorias

select PUESTO.ID_PUESTO, NOMBRE_PUESTO, SALARIO, LINK_IMAGEN,
       LISTAGG(C2.NOMBRE_CATEGORIA, ',') within group ( order by C2.NOMBRE_CATEGORIA) as Categorias,
       PD.ID_DEPARTAMENTO, D.NOMBRE_DEPARTAMENTO
from PUESTO
INNER JOIN PUESTO_CATEGORIA PC on PUESTO.ID_PUESTO = PC.ID_PUESTO
INNER JOIN CATEGORIA C2 on PC.ID_CATEGORIA = C2.ID_CATEGORIA
INNER JOIN PUESTO_DEPARTAMENTO PD on PUESTO.ID_PUESTO = PD.ID_PUESTO
INNER JOIN DEPARTAMENTO D on PD.ID_DEPARTAMENTO = D.ID_DEPARTAMENTO
group by PUESTO.ID_PUESTO, NOMBRE_PUESTO, SALARIO, LINK_IMAGEN, PD.ID_DEPARTAMENTO, D.NOMBRE_DEPARTAMENTO
;

--Lista de Usuarios
select ID_USUARIO,  USERNAME, PASSWORD, R.NOMBRE_ROL, D.NOMBRE_DEPARTAMENTO, to_char(FECHA_INI,'DD/MM/YYYY')
from USUARIO
inner join DEPARTAMENTO D on D.ID_DEPARTAMENTO = USUARIO.ID_DEPARTAMENTO
inner join ROL R on R.ID_ROL = USUARIO.ID_ROL
where ESTADO = 1;


--Lista de departamentos especialmente para el coordinador
select * from DEPARTAMENTO Dep WHERE not Exists(
    select * from(
                  select Dep.ID_DEPARTAMENTO, Dep.NOMBRE_DEPARTAMENTO
FROM DEPARTAMENTO Dep
inner join USUARIO on Dep.ID_DEPARTAMENTO = USUARIO.ID_DEPARTAMENTO
inner join ROL on USUARIO.ID_ROL = ROL.ID_ROL
where rol.ID_ROL = 2
)Coors
where Dep.ID_DEPARTAMENTO = Coors.ID_DEPARTAMENTO);


--Lista de revisores disponibles
select REVISOR_EXPEDIENTES.ID_REVISOR_EXPEDIENTES
    from REVISOR_EXPEDIENTES
    inner join USUARIO on REVISOR_EXPEDIENTES.ID_USUARIO = USUARIO.ID_USUARIO
    group by CANTIDAD_EXP, USUARIO.ID_DEPARTAMENTO, USUARIO.ESTADO, ID_REVISOR_EXPEDIENTES
having USUARIO.ID_DEPARTAMENTO = 1
and USUARIO.ESTADO = 1
ORDER BY CANTIDAD_EXP ASC
fetch next 1 rows only
;

--Lista de expedientes por Revisor
select E.DPI, E.NOMBRES, E.APELLIDOS, E.EMAIL, E.DIRECCION, E.TELEFONO,
       to_char(E.FECHA_POST,'DD/MM/YYYY') FECHA, P.NOMBRE_PUESTO, E.CV, E.ID_EXPEDIENTE, U.ID_DEPARTAMENTO
from EXPEDIENTE E
inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO
inner join REVISOR_EXPEDIENTES RE on RE.ID_REVISOR_EXPEDIENTES = E.ID_REV_EXP
inner join USUARIO U on RE.ID_USUARIO = U.ID_USUARIO
where E.REVISADO = 0
and RE.ID_USUARIO = 2
;


--Expediente
select E.ID_EXPEDIENTE, E.DPI, E.NOMBRES, E.APELLIDOS, E.EMAIL, E.DIRECCION, E.TELEFONO, E.CV,
       E.REVISADO, E.CORREGIR, to_char(E.FECHA_POST,'DD/MM/YYYY'), E.ID_PUESTO, P.NOMBRE_PUESTO
from EXPEDIENTE E
inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO
where E.ID_USUARIO = 5
;


--Requisitos
select R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO,
       LISTAGG(F.NOMBRE_FORMATO, ',') within group ( order by F.NOMBRE_FORMATO) as Formatos
from PUESTO_REQUISITO PR
inner join REQUISITO R on R.ID_REQUISITO = PR.ID_REQUISITO
inner join FORMATO_REQUISITO FR on R.ID_REQUISITO = FR.ID_REQUISITO
inner join FORMATO F on F.ID_FORMATO = FR.ID_FORMATO
where PR.ID_PUESTO = 1
group by PR.ID_REQUISITO, R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO
;


--Requisitos faltantes
select R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO,
       LISTAGG(F.NOMBRE_FORMATO, ',') within group ( order by F.NOMBRE_FORMATO) as Formatos
from PUESTO_REQUISITO PR
inner join REQUISITO R on R.ID_REQUISITO = PR.ID_REQUISITO
inner join FORMATO_REQUISITO FR on R.ID_REQUISITO = FR.ID_REQUISITO
inner join FORMATO F on F.ID_FORMATO = FR.ID_FORMATO
WHERE not Exists(
    select * from(
                    select D.NOMBRE_DOCUMENTO
                    FROM DOCUMENTO D
                    where D.ID_EXPEDIENTE = 43
                    and (D.ACEPTADO = 2 or D.ACEPTADO = 1)

    )docs
inner join REQUISITO R on R.ID_REQUISITO = PR.ID_REQUISITO
where R.NOMBRE_REQUISITO = docs.NOMBRE_DOCUMENTO
)
and PR.ID_PUESTO = 1
group by PR.ID_REQUISITO, R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO
;


--Aceptados
select D.NOMBRE_DOCUMENTO, D.LINK_DESCARGA
from DOCUMENTO D
inner join EXPEDIENTE E on E.ID_EXPEDIENTE = D.ID_EXPEDIENTE
where E.ID_EXPEDIENTE = 1
and D.ACEPTADO = 1
;



--Por Aceptar
select D.ID_DOCUMENTO, D.NOMBRE_DOCUMENTO, D.LINK_DESCARGA
from DOCUMENTO D
inner join EXPEDIENTE E on E.ID_EXPEDIENTE = D.ID_EXPEDIENTE
inner join REVISOR_EXPEDIENTES RE on RE.ID_REVISOR_EXPEDIENTES = E.ID_REV_EXP
where RE.ID_USUARIO = 3
and D.ACEPTADO = 2
;



--Mostrar postulantes Coordinador
select E.ID_USUARIO, E.DPI, E.NOMBRES, E.APELLIDOS, P.NOMBRE_PUESTO, P.SALARIO
from EXPEDIENTE E
inner join USUARIO U on U.ID_USUARIO = E.ID_USUARIO
inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO
where E.CORREGIR = 0
and U.ID_DEPARTAMENTO is null
and U.ESTADO = 1
and E.ID_DEPARTAMENTO = 1 --Departamento del coordinador
;


--Mostrar plantilla
select E.ID_USUARIO, E.DPI, E.NOMBRES, E.APELLIDOS, P.NOMBRE_PUESTO, P.SALARIO
from EXPEDIENTE E
inner join USUARIO U on U.ID_USUARIO = E.ID_USUARIO
inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO
where U.ID_ROL = 4
and U.ESTADO = 1
and U.ID_DEPARTAMENTO = 1 --Departamento del Usuario
;


--REPORTE 1
select E.NOMBRES, E.APELLIDOS, P.NOMBRE_PUESTO, D.NOMBRE_DEPARTAMENTO
from USUARIO U
inner join DEPARTAMENTO D on D.ID_DEPARTAMENTO = U.ID_DEPARTAMENTO
inner join EXPEDIENTE E on U.ID_USUARIO = E.ID_USUARIO
inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO
where U.ID_ROL = 4
;


--REPORTE 2
select D.NOMBRE_DEPARTAMENTO, COUNT(U.ID_USUARIO) Cantidad
from DEPARTAMENTO D
INNER JOIN USUARIO U on D.ID_DEPARTAMENTO = U.ID_DEPARTAMENTO
where U.ID_ROL = 4
group by  D.NOMBRE_DEPARTAMENTO
ORDER BY Cantidad DESC
fetch next 5 rows only
;


--REPORTE 3
select U.USERNAME
from REVISOR_EXPEDIENTES RE
inner join USUARIO U on U.ID_USUARIO = RE.ID_USUARIO
where ID_ROL = 3
ORDER BY RE.TOTAL DESC
fetch next 5 rows only
;

--REPORTE 4
select NOMBRES, APELLIDOS, RECHAZADOS
from EXPEDIENTE
where RECHAZADOS > 0
ORDER BY RECHAZADOS DESC
fetch next 5 rows only
;


--REPORTE 5
select D.NOMBRE_DEPARTAMENTO
from DEPARTAMENTO D
ORDER BY CAPITAL_DEPARTAMENTO ASC
fetch next 5 rows only
;

select * from REQUISITO;
select * from USUARIO;
select * from REVISOR_EXPEDIENTES;
select * from EXPEDIENTE;
select * from DOCUMENTO;
select * from DEPARTAMENTO;


commit;