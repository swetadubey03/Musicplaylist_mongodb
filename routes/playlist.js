const express = require('express')

const router = express.Router()
const{createPlaylist,listPlaylist} = require("../controllers/playlistController")

router.route("/").post(createPlaylist)
// router.route("/").get(listPlaylist)

module.exports = router