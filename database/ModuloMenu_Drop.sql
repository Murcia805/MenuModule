-- Last modification date: 2019-09-18 18:01:41.091

-- foreign keys
ALTER TABLE Plate_Ingredients
    DROP CONSTRAINT PlatosXIngredientes_Ingredientes;

ALTER TABLE Plate_Ingredients
    DROP CONSTRAINT PlatosXIngredientes_Platos;

ALTER TABLE Plate
    DROP CONSTRAINT Platos_TiposPlato;

ALTER TABLE Reservation_Plate
    DROP CONSTRAINT ReservationXPlates_Reservation;

ALTER TABLE Reservation_Plate
    DROP CONSTRAINT ReservationXPlates_Plates;

-- tables
DROP TABLE Ingredient;

DROP TABLE Plate;

DROP TABLE Plate_Ingredients;

DROP TABLE TypeOfPlate;

DROP TABLE Reservation_Plate;

DROP TABLE Reservation;

-- End of file.