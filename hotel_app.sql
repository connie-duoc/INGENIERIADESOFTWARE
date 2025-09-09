CREATE TABLE Hotel (
  hotel_id       INT PRIMARY KEY,
  nombre         VARCHAR(120) NOT NULL,
  direccion      VARCHAR(200) NOT NULL,
  categoria      VARCHAR(20)
);

CREATE TABLE Habitacion (
  habitacion_id  INT PRIMARY KEY,
  hotel_id       INT NOT NULL,
  tipo           VARCHAR(50) NOT NULL,    -- simple/doble/suite
  capacidad      INT NOT NULL,
  precio         DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_hab_hotel FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id)
);

CREATE TABLE Cliente (
  cliente_id     INT PRIMARY KEY,
  nombre         VARCHAR(80) NOT NULL,
  apellido       VARCHAR(80) NOT NULL,
  correo         VARCHAR(120) UNIQUE NOT NULL,
  telefono       VARCHAR(30)
);

CREATE TABLE Reserva (
  reserva_id        INT PRIMARY KEY,
  cliente_id        INT NOT NULL,
  habitacion_id     INT NOT NULL,
  fecha_entrada     DATE NOT NULL,
  fecha_salida      DATE NOT NULL,
  cantidad_personas INT NOT NULL,
  CONSTRAINT fk_res_cli  FOREIGN KEY (cliente_id)    REFERENCES Cliente(cliente_id),
  CONSTRAINT fk_res_hab  FOREIGN KEY (habitacion_id) REFERENCES Habitacion(habitacion_id),
  CONSTRAINT chk_fechas  CHECK (fecha_salida > fecha_entrada)
);

-- Datos de ejemplo mínimos para un video demostrativo de CRUD
INSERT INTO Hotel VALUES
  (1,'Hotel Pacific Reef','Av. Central 123, Santiago','4 estrellas'),
  (2,'Hotel Andes View','Calle Norte 456, Valparaíso','3 estrellas');

INSERT INTO Habitacion VALUES
  (101,1,'Doble',2,65000.00),
  (102,1,'Suite',3,120000.00),
  (201,2,'Simple',1,42000.00);

INSERT INTO Cliente VALUES
  (1001,'Ana','Pérez','ana.perez@mail.com','+56911111111'),
  (1002,'Luis','Gómez','luis.gomez@mail.com','+56922222222');

INSERT INTO Reserva VALUES
  (5001,1001,101,'2025-09-20','2025-09-22',2);

-- CRUD de ejemplo (ajusta al motor si usas PostgreSQL: usa RETURNING si lo necesitas)
-- CREATE
INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1003,'María','López','maria.lopez@mail.com','+56933333333');

-- READ
SELECT * FROM Hotel;
SELECT * FROM Habitacion WHERE hotel_id = 1;
SELECT * FROM Cliente;
SELECT * FROM Reserva;

-- UPDATE
UPDATE Habitacion SET precio = 68000.00 WHERE habitacion_id = 101;

-- DELETE (de ejemplo: borrar una reserva de prueba)
DELETE FROM Reserva WHERE reserva_id = 5001;