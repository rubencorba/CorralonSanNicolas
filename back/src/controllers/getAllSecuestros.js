const {Secuestros,Actas}= require('../db.js');

const getAllSecuestros = async () => {
    return await Secuestros.findAll({
      include: [
        {
          model: Actas,
          as: 'Acta', // Este alias debe coincidir con el definido en tu asociación
          attributes: ['nro'], // Solo traer el campo 'nro' de Actas
        },
      ],
    });
  };


module.exports={getAllSecuestros}