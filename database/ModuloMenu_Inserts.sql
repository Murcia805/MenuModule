INSERT INTO TypeOfPlate(typeName, description)
VALUES ('Almuerzo', 'Es un almuerzo');

INSERT INTO TypeOfPlate(typeName, description)
VALUES ('Cena', 'Es una cena');

INSERT INTO Plate(FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount)
VALUES (1,1, 'Pollito frito', 'Es un pollito frito', 10000);

INSERT INTO Plate(FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount)
VALUES (1,2, 'Pescadito frito', 'Es un pescadito frito', 15000);

INSERT INTO Plate(FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount)
VALUES (2, 1, 'Arroz chino', 'Del chino', 10000);

INSERT INTO Plate(FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount)
VALUES (2, 2, 'Arroz llanero', 'Del llano', 10000);

INSERT INTO Ingredient(ingredientName, description)
VALUES ('Pollo', 'Es un pollo');

INSERT INTO Ingredient(ingredientName, description)
VALUES ('Pescado', 'Es un pescado');

INSERT INTO Ingredient(ingredientName, description)
VALUES ('Carne de perro', 'Es carne de perro');

INSERT INTO Ingredient(ingredientName, description)
VALUES ('Aceite', 'Es un aceite');

INSERT INTO Ingredient(ingredientName, description)
VALUES ('Arroz', 'Sirve para hacer arroz');

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (1, 1);

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (1, 4);

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (2, 4);

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (3,3);

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (3, 4);

INSERT INTO Plate_Ingredients(FK_idPlate, FK_idIngredient)
VALUES (4, 1);

INSERT  INTO Reservation(PK_idRes, FK_idUser, FK_idRestaurant, Comment)
VALUES (1, 1, 1, 'Bien cocidos.');

INSERT INTO Reservation_Plate (FK_idPlate, FK_idRes, ingredients)
VALUES (1, 1, '[1, 2, 3]');

INSERT INTO Reservation_Plate (FK_idPlate, FK_idRes, ingredients)
VALUES (2, 1, '[1, 2, 3]');

INSERT INTO Reservation_Plate (FK_idPlate, FK_idRes, ingredients)
VALUES (3, 1, '[1, 2, 3]');