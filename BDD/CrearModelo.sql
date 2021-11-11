--Formato
CREATE TABLE Formato(
    id_formato         NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_formato     VARCHAR(50)
);
ALTER TABLE Formato ADD CONSTRAINT Formato_primaryK PRIMARY KEY (id_formato);

--Requisito
CREATE TABLE Requisito(
    id_requisito         NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_requisito     VARCHAR(200)
);
ALTER TABLE Requisito ADD CONSTRAINT Requisito_primaryK PRIMARY KEY (id_requisito);


--Formato-Requisito
CREATE TABLE formato_requisito(
    id_formato_requisito    NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    id_requisito            NUMBER,
    id_formato              NUMBER
);

ALTER TABLE formato_requisito ADD CONSTRAINT formato_requisito_primaryK PRIMARY KEY (id_formato_requisito);
ALTER TABLE formato_requisito ADD CONSTRAINT formato_requisito_requisitoFk FOREIGN KEY (id_requisito) REFERENCES Requisito(id_requisito);
ALTER TABLE formato_requisito ADD CONSTRAINT formato_requisito_formatoFk   FOREIGN KEY (id_formato)   REFERENCES Formato(id_formato);


--Puesto
CREATE TABLE Puesto(
    id_puesto       NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_puesto   VARCHAR(200),
    salario         NUMBER,
    link_imagen     VARCHAR(200)
);
ALTER TABLE Puesto ADD CONSTRAINT puesto_primaryK PRIMARY KEY (id_puesto);


--puesto-Requisito
CREATE TABLE puesto_requisito(
    id_puesto_requisito     NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    id_requisito            NUMBER,
    id_puesto               NUMBER,
    tamanio_requisito       NUMBER,
    obligatorio             CHAR
);

ALTER TABLE puesto_requisito ADD CONSTRAINT puesto_requisito_primaryK PRIMARY KEY (id_puesto_requisito);
ALTER TABLE puesto_requisito ADD CONSTRAINT puesto_requisito_puestoFk   FOREIGN KEY (id_puesto)   REFERENCES Puesto(id_puesto);
ALTER TABLE puesto_requisito ADD CONSTRAINT puesto_requisito_requisitoFk FOREIGN KEY (id_requisito) REFERENCES Requisito(id_requisito);


--Categoria
CREATE TABLE Categoria(
    id_categoria         NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_categoria     VARCHAR(100)
);
ALTER TABLE Categoria ADD CONSTRAINT Categoria_primaryK PRIMARY KEY (id_categoria);


--puesto-categoria
CREATE TABLE puesto_categoria(
    id_puesto_categoria     NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    id_categoria            NUMBER,
    id_puesto               NUMBER
);

ALTER TABLE puesto_categoria ADD CONSTRAINT puesto_categoria_primaryK PRIMARY KEY (id_puesto_categoria);
ALTER TABLE puesto_categoria ADD CONSTRAINT puesto_categoria_puestoFk    FOREIGN KEY (id_puesto)   REFERENCES Puesto(id_puesto);
ALTER TABLE puesto_categoria ADD CONSTRAINT puesto_categoria_categoriaFk FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria);


--Departamento
CREATE TABLE Departamento(
    id_departamento         NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_departamento     VARCHAR(200),
    capital_departamento    NUMBER,
    departamento_padre      VARCHAR(200)
);
ALTER TABLE Departamento ADD CONSTRAINT departamento_primaryK PRIMARY KEY (id_departamento);


--puesto-departamento
CREATE TABLE puesto_departamento(
    id_puesto_departamento  NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    id_departamento         NUMBER,
    id_puesto               NUMBER
);

ALTER TABLE puesto_departamento ADD CONSTRAINT puesto_departamento_primaryK PRIMARY KEY (id_puesto_departamento);
ALTER TABLE puesto_departamento ADD CONSTRAINT puesto_departamento_puestoFk    FOREIGN KEY (id_puesto)   REFERENCES Puesto(id_puesto);
ALTER TABLE puesto_departamento ADD CONSTRAINT puesto_departamento_departamentoFk FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento);


--Rol
CREATE TABLE Rol(
    id_rol         NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nombre_rol     VARCHAR(50)
);
ALTER TABLE Rol ADD CONSTRAINT rol_primaryK PRIMARY KEY (id_rol);


--Usuario
CREATE TABLE Usuario(
    id_usuario          NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    username            VARCHAR(200),
    password            VARCHAR(200),
    fecha_ini           DATE,
    fecha_fin           DATE,
    estado              VARCHAR(20),
    id_rol              NUMBER,
    id_departamento     NUMBER
);
ALTER TABLE Usuario ADD CONSTRAINT Usuario_primaryK PRIMARY KEY (id_usuario);
ALTER TABLE Usuario ADD CONSTRAINT Usuario_rolFk FOREIGN KEY (id_rol) REFERENCES Rol(id_rol);
ALTER TABLE Usuario ADD CONSTRAINT Usuario_departamentoFk FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento);


--calificacion_usuario_puesto
CREATE TABLE calificacion_usuario_puesto(
    id_calificacion_usuario_puesto  NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    calificacion                    NUMBER,
    id_usuario                      NUMBER,
    id_puesto                       NUMBER
);

ALTER TABLE calificacion_usuario_puesto ADD CONSTRAINT calificacion_usuario_puesto_primaryK PRIMARY KEY (id_calificacion_usuario_puesto);
ALTER TABLE calificacion_usuario_puesto ADD CONSTRAINT calificacion_usuario_puesto_usuarioFk FOREIGN KEY (id_usuario)   REFERENCES Usuario(id_usuario);
ALTER TABLE calificacion_usuario_puesto ADD CONSTRAINT calificacion_usuario_puesto_puestoFk FOREIGN KEY (id_puesto) REFERENCES Puesto(id_puesto);


--revisor_expedientes
CREATE TABLE revisor_expedientes(
    id_revisor_expedientes  NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    cantidad_exp            NUMBER,
    id_usuario              NUMBER,
    total                   NUMBER
);

ALTER TABLE revisor_expedientes ADD CONSTRAINT revisor_expedientes_primaryK PRIMARY KEY (id_revisor_expedientes);
ALTER TABLE revisor_expedientes ADD CONSTRAINT revisor_expedientes_usuarioFk FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);


--Expediente
CREATE TABLE Expediente(
    id_expediente       NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    DPI                 NUMBER,
    nombres             VARCHAR(200),
    apellidos           VARCHAR(200),
    email               VARCHAR(200),
    direccion           VARCHAR(200),
    telefono            NUMBER,
    cv                  VARCHAR(200),
    revisado            CHAR,
    corregir            CHAR,
    fecha_post          DATE,
    id_departamento     NUMBER,
    id_puesto           NUMBER,
    id_rev_exp          NUMBER,
    id_usuario          NUMBER,
    rechazados          NUMBER
);
ALTER TABLE Expediente ADD CONSTRAINT Expediente_primaryK PRIMARY KEY (id_expediente);
ALTER TABLE Expediente ADD CONSTRAINT Expediente_puestoFk FOREIGN KEY (id_puesto) REFERENCES Puesto(id_puesto);
ALTER TABLE Expediente ADD CONSTRAINT Expediente_rev_expFk FOREIGN KEY (id_rev_exp) REFERENCES revisor_expedientes(id_revisor_expedientes);
ALTER TABLE Expediente ADD CONSTRAINT Expediente_usuarioFk FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);


--documento
CREATE TABLE Documento(
    id_documento        NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) ,
    nombre_documento    VARCHAR(200),
    aceptado            CHAR,
    motivo              VARCHAR(500),
    fecha               DATE,
    link_descarga       VARCHAR(200),
    id_expediente       NUMBER
);
ALTER TABLE Documento ADD CONSTRAINT Documento_primaryK PRIMARY KEY (id_documento);
ALTER TABLE Documento ADD CONSTRAINT Documento_expedienteFk FOREIGN KEY (id_expediente) REFERENCES Expediente(id_expediente);


insert into ROL (NOMBRE_ROL) values ('Admin');
insert into ROL (NOMBRE_ROL) values ('Coordinador');
insert into ROL (NOMBRE_ROL) values ('Revisor');
insert into ROL (NOMBRE_ROL) values ('Aplicante');

insert into USUARIO (USERNAME, PASSWORD, FECHA_INI, ESTADO, ID_ROL)
values ('Admin', '1234', TO_DATE('03/11/2021', 'DD/MM/YYYY'), 1, 1);

commit;

drop table Documento;
drop table Expediente;
drop table revisor_expedientes;
drop table calificacion_usuario_puesto;
drop table Usuario;
drop table Rol;
drop table puesto_departamento;
drop table Departamento;
drop table puesto_categoria;
drop table Categoria;
drop table puesto_requisito;
drop table Puesto;
drop table formato_requisito;
drop table Requisito;
drop table Formato;





