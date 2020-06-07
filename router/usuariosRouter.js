const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosController');


router.get("/", async (req, res, next) => {
    try {
        const usuarios = await usuariosController.getUsuarios();
        res.status(200).json(usuarios);
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {

  const id = req.params.id;
  try {
      const usuario = await usuariosController.getUsuario(id);
      if (usuario !==undefined)
        res.status(200).json(usuario);
      else
        res.status(404).json("Not Found")
  } catch (e) {
      res.status(500).json(e);
      next(e);
  }
});


router.post("/", async(req, res, next) => {
  try {
      const usuarioAdd = await usuariosController.addUsuario(req.body);
      res.status(201).json({ status: 'success', message: `${usuarioAdd} usuario agregado.`, usaurio: req.body })
  } catch (e) {
    res.status(500).json(e);
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {

  const id = req.params.id;
  try {
      const removeUsuario = await usuariosController.removeUsuario(id);
      if (removeUsuario === 1)
        res.status(200).json({status: 'success', message: `${removeUsuario} usuario borrado.`});
      else
        res.status(404).json("Not Found")
  } catch (e) {
      res.status(500).json(e);
      next(e);
  }
});


module.exports = router;
