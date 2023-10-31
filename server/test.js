const express = require('express');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const session = require('express-session');

const app = express();

// Đặt up phiên làm việc (session)
app.use(session({
    secret: 'eglv bxko aqbh eyws',
    resave: true,
    saveUninitialized: true
}));

// Đăng ký ứng dụng của bạn với Google để lấy clientId và clientSecret
const GOOGLE_CLIENT_ID = '177215070197-l5ses4mj478q6dojhs34rsphhlvd1f4o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Cấu hình Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
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

// Sử dụng Passport và session
app.use(passport.initialize());
app.use(passport.session());

// Đăng nhập bằng tài khoản Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Xử lý callback sau khi đăng nhập thành công
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
app.get('/profile', (req, res) => {
    res.send('<h1>Xin chào, ' + req.user.displayName + '</h1>');
});

// Trang chính
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Đăng nhập bằng Google</a>');
});

app.listen(8080, () => {
    console.log('Server đang chạy tại http://localhost:8080');
});
