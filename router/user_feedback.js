const UserFeedBack = require('../controllers/user_feedback');
const router = require('koa-router')({prefix:'/feedback'});

router.post('/user/add',UserFeedBack.saveUserFeedback);

module.exports = router;