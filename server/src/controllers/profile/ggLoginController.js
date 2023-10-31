const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Đăng ký ứng dụng của bạn với Google để lấy clientId và clientSecret
const GOOGLE_CLIENT_ID = '177215070197-h8lcbkn50td8nnoi24ijhctekaqkikac.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Cấu hình Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
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
    res.send('<h1>Xin chào, ' + req.user.displayName + '</h1>');
}

module.exports = {
    ggLoginController, ggCallbackController, ggInfor
}