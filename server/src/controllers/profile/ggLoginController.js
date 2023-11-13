const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Cấu hình Passport
passport.use(new GoogleStrategy({
    clientID: '177215070197-h8lcbkn50td8nnoi24ijhctekaqkikac.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Xử lý thông tin người dùng ở đây, ví dụ: lưu vào cơ sở dữ liệu
    return done(null, profile);
}));
  
// Serialize và deserialize người dùng
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const ggLoginController = async (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })
}

const ggCallbackController = async (req, res) => {
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
}

const ggInfor = async (req, res) => {
    res.json('test ok')
}

module.exports = {
    ggLoginController, ggCallbackController, ggInfor
}