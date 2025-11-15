const express = require('express')

const getCredentials = (req, res) => {
    const Credentials = { "username": "dacs2", "password": "1" }
    res.status(200).json(Credentials)
}

module.exports = { getCredentials }