const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/emailService');

// Registrácia
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kontrola, či užívateľ už existuje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Užívateľ s týmto emailom už existuje' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Vytvoriť JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Prihlásenie
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Neplatné prihlasovacie údaje' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Neplatné prihlasovacie údaje' });
    }

    // Vytvoriť JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Získať profil užívateľa
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aktualizovať profil
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Požiadať o reset hesla
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Z bezpečnostných dôvodov vráťme vždy úspech
      return res.json({ message: 'Ak email existuje, bol odoslaný reset link' });
    }

    // Generovať reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hodina
    await user.save();

    // Odoslať email
    try {
      await emailService.sendPasswordReset(user, resetToken);
      res.json({ message: 'Email s inštrukciami bol odoslaný' });
    } catch (emailError) {
      // Ak email zlyhá, vymaž token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(500).json({ message: 'Chyba pri odosielaní emailu' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resetovať heslo
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token a heslo sú povinné' });
    }

    // Hash token pre porovnanie
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token je neplatný alebo expiroval' });
    }

    // Nastaviť nové heslo
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Heslo bolo úspešne zmenené' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

