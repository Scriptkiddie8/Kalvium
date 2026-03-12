const router = express.Router();

const { signup, login } = require("../controllers/authControllers");

router.post("/signup", signup);
router.get("/login", login);

module.exports = router;
