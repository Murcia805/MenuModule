
const { Pool } = require('pg');

const pool = new Pool({
    host: '181.50.100.167', //'181.50.100.167'
    user: 'postgres',
    password: '1234',
    database: 'postgres',
    port: '7002'
});

// GET CONTROLLERS --------------------

const  getRestaurantPlates = async (req, res) => {
    const idRestaurante = req.params.id;
    response = await pool.query('SELECT * FROM Plate WHERE fk_idrestaurant = $1', [idRestaurante]);
    res.json(response.rows)
};

const  getPlates = async (req, res) => {
    response = await pool.query('SELECT * FROM Plate');
    res.json(response.rows)
};

const  getIngredients = async (req, res) => {
    response = await pool.query('SELECT * FROM ingredient');
    res.json(response.rows)
};

const  getPlatesType = async (req, res) => {
    const idType = req.params.id;
    response = await pool.query('SELECT * FROM Plate WHERE fk_idtypeplate = $1', [idType]);
    res.json(response.rows)
};

const getIngredientsByPlate = async(req, res) => {
    const id = req.params.id;

    const response = await pool.query('SELECT PK_idIngredient, ingredientName, description, active FROM Ingredient INNER JOIN Plate_Ingredients ON(FK_idIngredient = PK_idIngredient)WHERE FK_idPlate = $1;', [id]);

    res.json(response.rows)
};

const getPlatesByReservation = async(req, res) => {
    const id = req.params.id;

    const response = await pool.query('SELECT PK_idPlate, FK_idTypePlate, plateName, plateDescription, amount, imagePlate FROM Reservation_Plate INNER JOIN Plate ON (FK_idPlate = PK_idPlate) WHERE FK_idRes = $1;', [id]);

    res.json(response.rows)
};

// POST CONTROLLERS --------------------

const createPlate = async (req, res) => {
    const { fk_idTypePlate, fk_idRestaurant, plateName, plateDescription, amount, ingredients, imageplate} = req.body;
    const response1 = await pool.query('INSERT INTO plate (FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount,imageplate) VALUES ($1, $2, $3, $4, $5, $6)', [fk_idTypePlate,fk_idRestaurant,plateName, plateDescription, amount,imageplate]);
    const idPlato = await pool.query('SELECT pk_idplate from plate WHERE FK_idRestaurant = $1 AND plateName = $2', [fk_idRestaurant,plateName]);
    
    for(var i = 0; i < ingredients.length; i++){
        const response2 = await pool.query('INSERT INTO Plate_Ingredients (FK_idPlate, FK_idIngredient) VALUES ($1, $2)', [idPlato.rows[0].pk_idplate, ingredients[i]]);
    };

    res.json({
        message: 'Plato creado'
    });
};

const createIngredient = async(req, res) => {
    const {ingredientname, description} = req.body;

    const response = await pool.query('INSERT INTO ingredient (ingredientname, description) VALUES ($1, $2)', [ingredientname, description]);

    res.json({
        message: 'Ingrediente creado'
    });
};

const createReservation = async(req, res) => {
    const idUsuario = req.params.idUsuario;
    const idReservation = req.params.idReservation;
    const idRestaurante = req.params.idRestaurante;

    const response = await pool.query('INSERT INTO Reservation (PK_idRes, FK_idUser, FK_idRestaurant) VALUES ($1, $2, $3)', [idReservation, idUsuario, idRestaurante]);

    res.json({
        message: 'Reserva creada'
    });
};


// PUT CONTROLLERS --------------------

const updatePlate = async(req, res) => {
    const id = req.params.id;
    const { fk_idtypeplate, platename, platedescription, amount, ingredients,imageplate, activo} = req.body;
    const response1 = await pool.query('UPDATE plate SET FK_idTypePlate = $1, plateName = $2, platedescription = $3, amount = $4, imageplate = $6, active= $7 WHERE pk_idplate = $5',[fk_idtypeplate, platename, platedescription, amount, id, imageplate, activo]);
    const response2 = await pool.query('DELETE FROM Plate_Ingredients WHERE FK_idPlate = $1', [id]);


    for(var i = 0; i < ingredients.length; i++){
        const response2 = await pool.query('INSERT INTO Plate_Ingredients (FK_idPlate, FK_idIngredient) VALUES ($1, $2)', [id, ingredients[i]]);
    };
    res.json({
        message: 'Plato modificado'
    });
};

const updateIngredient = async(req, res) => {
    const id = req.params.id;
    const {ingredientname, description} = req.body;

    const response = await pool.query('UPDATE ingredient SET ingredientname = $1, description = $2 WHERE pk_idingredient = $3', [ingredientname, description, id]);

    res.json({
        message: 'Ingrediente modificado'
    });
};

const deletePlate = async(req, res) => {
    const id = req.params.id;

    const response = await pool.query('UPDATE plate SET active = FALSE WHERE pk_idplate = $1', [id]);

    res.json({
        message: 'Plato Eliminado'
    });
};

const deleteIngredient = async(req, res) => {
    const id = req.params.id;

    const response = await pool.query('UPDATE ingredient SET active = FALSE WHERE pk_idingredient = $1', [id]);

    res.json({
        message: 'Ingrediente Eliminado'
    });
};

const addPlatesToReservation = async(req, res) => {
    const idReserva = req.params.id;
    let totalAmount = 0;
    
    const {plates} = req.body;
    console.log(idReserva);
    for(var i = 0; i < plates.length; i++){
        const response = await pool.query('INSERT INTO Reservation_Plate (FK_idPlate, FK_idRes, ingredients) VALUES ($1, $2, $3)', [plates[i]["idPlate"], idReserva, plates[i]["ingredients"]]);
        totalAmount = totalAmount + plates[i]["amount"];
    };

    console.log(totalAmount)

    const response2 = await pool.query('UPDATE Reservation SET totalAmount = $1 WHERE PK_idRes = $2', [totalAmount, idReserva]);

    res.json({
        message: 'platos añadidos a la reserva'
    });
};

module.exports = {
    getRestaurantPlates,
    getPlates,
    getIngredients,
    getPlatesType,
    createPlate,
    createIngredient,
    updatePlate,
    updateIngredient,
    deletePlate,
    deleteIngredient,
    getIngredientsByPlate,
    getPlatesByReservation,
    createReservation,
    addPlatesToReservation
}
