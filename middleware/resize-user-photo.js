const sharp = require("sharp");

const resizeUserPhoto = catchAsync(async (req, res, next) => {
    const { file } = req;
    if (!file) return next();
    file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
});

module.exports = resizeUserPhoto;