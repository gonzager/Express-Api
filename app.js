const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3001;

let respuesta = {
    codigo: "200",
    mensaje: "Uusario Creado Correctamente",
    usuario: ''
};


let usuarios =[ {
    id: 1,
    nombre: "Gerardo",
    apellido: "Gonzalez",
    edad: 44,
    tieneRegistro: false
}];


app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

app.get('/usuario', (req, res) => {
    res.send(usuarios.sort((a, b) => a.id - b.id));
});

app.post('/usuario', (req, res) => {
    const id = usuarios.map( e => e.id ).reduce((a, b) => {return a > b ? a : b} ) + 1
    const usuario = {
        id: id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        tieneRegistro: req.body.tieneRegistro
    }
    usuarios.push(usuario);
    respuesta.usuario = usuario
    res.send(respuesta)
} )

app.delete('/usuario/:idUser' , (req, res) => {
    const idUser = req.params.idUser;
    respuesta.mensaje = `El id de usuario a borrar es ${idUser}`;
    const usuario = usuarios.find(e=>e.id===parseInt(idUser,10))
    const pos = usuarios.indexOf(usuario);
    usuarios.splice(pos,1)
    respuesta.usuario = usuario
    res.send(respuesta);

})


app.put('/usuario/:idUser' , (req, res) => {
    const idUser = req.params.idUser;

    const usuarioNew = {
        id: idUser,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        tieneRegistro: req.body.tieneRegistro
    }

    respuesta.mensaje = `El id de usuario modificado es ${idUser}`;
    const usuario = usuarios.find(e=>e.id===parseInt(idUser,10))
    const pos = usuarios.indexOf(usuario);
    usuarios.splice(pos,1)
    usuarios.push(usuarioNew)
    respuesta.usuario = usuarioNew
    res.send(respuesta);

})



app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
})


