--HOTEL ---
SET DEFINE OFF;
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';


BEGIN
  INSERT INTO Hotel (hotel_id, nombre, direccion, categoria)
  VALUES (10, 'Hotel Pacific Reef', 'Av. Costa 123', '4*');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Hotel (hotel_id, nombre, direccion, categoria)
  VALUES (20, 'Hotel Pacific Reef - Torre B', 'Av. Costa 456', '4*');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
COMMIT;

------------------------------------------------------------------------
-- 1) Habitaciones 

BEGIN
  INSERT INTO Habitacion (habitacion_id, hotel_id, tipo, capacidad, precio)
  VALUES (101, 10, 'Single', 1, 60000);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Habitacion (habitacion_id, hotel_id, tipo, capacidad, precio)
  VALUES (102, 10, 'Doble', 2, 90000);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Habitacion (habitacion_id, hotel_id, tipo, capacidad, precio)
  VALUES (201, 20, 'Suite', 4, 140000);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
COMMIT;

-- 2) Clientes (incluye 1001 y 1002 que faltaban)

BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1001, 'Ana',   'Pérez',    'ana.perez@mail.com',   '+56911111111');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1002, 'Luis',  'González', 'luis.gonzalez@mail.com','+56922222222');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1003, 'María', 'López',    'maria.lopez@mail.com',  '+56933333333');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1004, 'Javier','Muñoz',    'javier.munoz@mail.com', '+56944444444');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1005, 'Sofía', 'Rojas',    'sofia.rojas@mail.com',  '+56955555555');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1006, 'Camila','Torres',   'camila.torres@mail.com','+56966666666');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
VALUES (1007, 'Pedro', 'Soto',     'pedro.soto@mail.com',   '+56977777777');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
COMMIT;

-- 3) Reservas (ahora sí debe respetar la FK, porque existen 101, 102 y 201)

BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5002,1001,101, DATE '2025-10-18', DATE '2025-10-20', 2);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5003,1002,201, DATE '2025-09-20', DATE '2025-09-22', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5004,1007,102, DATE '2025-09-25', DATE '2025-09-28', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5005,1006,201, DATE '2025-10-18', DATE '2025-10-20', 3);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5006,1001,201, DATE '2025-10-10', DATE '2025-10-14', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5007,1001,201, DATE '2025-09-25', DATE '2025-09-28', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5008,1001,101, DATE '2025-10-01', DATE '2025-10-03', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5009,1006,201, DATE '2025-09-20', DATE '2025-09-22', 3);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5010,1001,102, DATE '2025-10-10', DATE '2025-10-14', 3);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5011,1005,201, DATE '2025-10-10', DATE '2025-10-14', 1);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5012,1002,101, DATE '2025-09-25', DATE '2025-09-28', 3);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5013,1002,201, DATE '2025-09-20', DATE '2025-09-22', 2);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5014,1006,102, DATE '2025-09-20', DATE '2025-09-22', 2);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5015,1001,201, DATE '2025-09-20', DATE '2025-09-22', 2);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas)
VALUES (5016,1003,102, DATE '2025-10-01', DATE '2025-10-03', 2);
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
COMMIT;

-- 4) Verificaciones rápidas

-- Debe ser > 0 si ya cargó:
SELECT COUNT(*) AS total_en_reserva FROM Reserva;

-- Fechas válidas (debería dar 0):
SELECT COUNT(*) AS fechas_invalidas
FROM   Reserva
WHERE  fecha_salida <= fecha_entrada;

-- Top 10 reservas con join
SELECT r.reserva_id,
       c.nombre || ' ' || c.apellido AS cliente,
       ho.nombre                     AS hotel,
       h.habitacion_id,
       h.tipo,
       TO_CHAR(r.fecha_entrada,'YYYY-MM-DD') AS fecha_in,
       TO_CHAR(r.fecha_salida ,'YYYY-MM-DD') AS fecha_out,
       r.cantidad_personas,
       h.precio,
       (r.fecha_salida - r.fecha_entrada)            AS noches,
       h.precio * (r.fecha_salida - r.fecha_entrada) AS total_aprox
FROM   Reserva    r
JOIN   Cliente    c  ON c.cliente_id    = r.cliente_id
JOIN   Habitacion h  ON h.habitacion_id = r.habitacion_id
JOIN   Hotel      ho ON ho.hotel_id     = h.hotel_id
ORDER  BY r.reserva_id DESC
FETCH FIRST 10 ROWS ONLY;

