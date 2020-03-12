const { Router } = require('express');
const router = Router();

const { getRestaurantPlates, 
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
    addPlatesToReservation } = require('../controllers/index.controller')

// GET ROUTES
router.get('/plates', getPlates)
router.get('/plates/:id', getRestaurantPlates);
router.get('/ingredients', getIngredients);
router.get('/plates/type/:id', getPlatesType);
router.get('/ingredients/:id', getIngredientsByPlate);
router.get('/plates/reservation/:id', getPlatesByReservation)
// POST ROUTES
router.post('/plate', createPlate);
router.post('/ingredient', createIngredient);
router.post('/reservation/:idUsuario/:idReservation/:idRestaurante', createReservation);

// PUT ROUTES
router.put('/plate/:id', updatePlate);
router.put('/ingredient/:id', updateIngredient);
router.put('/delete/plate/:id', deletePlate);
router.put('/delete/ingredient/:id', deleteIngredient);
router.put('/reservation/plates/:id', addPlatesToReservation);


module.exports = router;