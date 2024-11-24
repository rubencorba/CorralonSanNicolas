const {Secuestros,Actas,Vehiculos}= require('../db.js');

const getAllSecuestros = async () => {
    return await Secuestros.findAll({
      include: [
        {
          model: Actas,
          /* as: 'Actas', */ // Este alias debe coincidir con el definido en tu asociación
          attributes: ['nro','lugar'], 
        },
        {
          model: Vehiculos,
          
          attributes: ['tipovh','dominio'], 
        },
      ],
    });
  };


module.exports={getAllSecuestros}