BEGIN
  INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
  VALUES (1003, 'María', 'López', 'maria.lopez@mail.com', '+56933333333');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
  VALUES (1004, 'Javier', 'Muñoz', 'javier.munoz@mail.com', '+56944444444');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
  VALUES (1005, 'Sofía', 'Rojas', 'sofia.rojas@mail.com', '+56955555555');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
  VALUES (1006, 'Camila', 'Torres', 'camila.torres@mail.com', '+56966666666');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
BEGIN
  INSERT INTO Cliente (cliente_id, nombre, apellido, correo, telefono)
  VALUES (1007, 'Pedro', 'Soto', 'pedro.soto@mail.com', '+56977777777');
EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL; END;
/
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5002,1001,101, TO_DATE('2025-10-18','YYYY-MM-DD'), TO_DATE('2025-10-20','YYYY-MM-DD'), 2);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5003,1002,201, TO_DATE('2025-09-20','YYYY-MM-DD'), TO_DATE('2025-09-22','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5004,1007,102, TO_DATE('2025-09-25','YYYY-MM-DD'), TO_DATE('2025-09-28','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5005,1006,201, TO_DATE('2025-10-18','YYYY-MM-DD'), TO_DATE('2025-10-20','YYYY-MM-DD'), 3);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5006,1001,201, TO_DATE('2025-10-10','YYYY-MM-DD'), TO_DATE('2025-10-14','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5007,1001,201, TO_DATE('2025-09-25','YYYY-MM-DD'), TO_DATE('2025-09-28','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5008,1001,101, TO_DATE('2025-10-01','YYYY-MM-DD'), TO_DATE('2025-10-03','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5009,1006,201, TO_DATE('2025-09-20','YYYY-MM-DD'), TO_DATE('2025-09-22','YYYY-MM-DD'), 3);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5010,1001,102, TO_DATE('2025-10-10','YYYY-MM-DD'), TO_DATE('2025-10-14','YYYY-MM-DD'), 3);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5011,1005,201, TO_DATE('2025-10-10','YYYY-MM-DD'), TO_DATE('2025-10-14','YYYY-MM-DD'), 1);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5012,1002,101, TO_DATE('2025-09-25','YYYY-MM-DD'), TO_DATE('2025-09-28','YYYY-MM-DD'), 3);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5013,1002,201, TO_DATE('2025-09-20','YYYY-MM-DD'), TO_DATE('2025-09-22','YYYY-MM-DD'), 2);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5014,1006,102, TO_DATE('2025-09-20','YYYY-MM-DD'), TO_DATE('2025-09-22','YYYY-MM-DD'), 2);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5015,1001,201, TO_DATE('2025-09-20','YYYY-MM-DD'), TO_DATE('2025-09-22','YYYY-MM-DD'), 2);
INSERT INTO Reserva (reserva_id, cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (5016,1003,102, TO_DATE('2025-10-01','YYYY-MM-DD'), TO_DATE('2025-10-03','YYYY-MM-DD'), 2);
COMMIT;

SELECT COUNT(*) AS total_en_reserva
FROM   Reserva;

SELECT reserva_id, cliente_id, habitacion_id,
       TO_CHAR(fecha_entrada,'YYYY-MM-DD') AS fecha_in,
       TO_CHAR(fecha_salida ,'YYYY-MM-DD') AS fecha_out,
       cantidad_personas
FROM   Reserva
ORDER  BY reserva_id DESC
FETCH FIRST 10 ROWS ONLY;


-- ¿La tabla está en tu esquema?
SELECT table_name
FROM   user_tables
WHERE  table_name = 'RESERVA';

-- ¿En qué esquema existe la tabla (si no apareciera en user_tables)?
SELECT owner, table_name
FROM   all_tables
WHERE  table_name = 'RESERVA';

COMMIT;
SELECT COUNT(*) FROM Reserva;


SELECT r.reserva_id,
       c.nombre || ' ' || c.apellido AS cliente,
       ho.nombre                     AS hotel,
       h.habitacion_id, h.tipo,
       TO_CHAR(r.fecha_entrada,'YYYY-MM-DD') AS fecha_in,
       TO_CHAR(r.fecha_salida ,'YYYY-MM-DD') AS fecha_out,
       r.cantidad_personas,
       h.precio,
       (r.fecha_salida - r.fecha_entrada)                      AS noches,
       h.precio * (r.fecha_salida - r.fecha_entrada)           AS total_aprox
FROM   Reserva    r
JOIN   Cliente    c  ON c.cliente_id    = r.cliente_id
JOIN   Habitacion h  ON h.habitacion_id = r.habitacion_id
JOIN   Hotel      ho ON ho.hotel_id     = h.hotel_id
ORDER  BY r.reserva_id DESC
FETCH FIRST 10 ROWS ONLY;


SELECT USER, SYS_CONTEXT('USERENV','CON_NAME') FROM dual;
SELECT COUNT(*) FROM Reserva;

