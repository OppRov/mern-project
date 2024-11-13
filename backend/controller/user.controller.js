import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const loginUser = async (req, res) => {
    const user = req.body

    if (!user.email || !user.password) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    try {
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(user.password, existingUser.password)
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({ success: true, message: 'Login successful', token })
    } catch (error) {
        console.error('Error logging in user:', error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

export const registerUser = async (req, res) => {
    const user = req.body

    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    try {
        const existingUser = await User.findOne({ email: user.email })
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = new User({ ...user, password: hashedPassword })
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(201).json({ success: true, message: 'Registration successful', token })
    } catch (error) {
        console.error('Error registering user:', error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }

}