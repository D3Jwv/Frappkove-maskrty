const User = require('../models/User');

// Získať všetkých užívateľov (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Získať jedného užívateľa (admin)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Užívateľ nebol nájdený' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aktualizovať užívateľa (admin)
exports.updateUser = async (req, res) => {
  try {
    const { role, active } = req.body;
    const updateData = {};
    
    if (role !== undefined) updateData.role = role;
    if (active !== undefined) updateData.active = active;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Užívateľ nebol nájdený' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Zmazať užívateľa (admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Užívateľ nebol nájdený' });
    }
    res.json({ message: 'Užívateľ bol zmazaný' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

