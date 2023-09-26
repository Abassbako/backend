const { registerUser, loginUser, findUser, getUsers } = require('../controllers/authControllers');

const { Router } = require('express');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:UserId', findUser);
router.get('/', getUsers);

module.exports = router;