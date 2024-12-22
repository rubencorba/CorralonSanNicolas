const {Infracciones,Secuestros_infracciones}= require('../db.js');

const infraccionesBySecuestroId = async (id) => {
    return await Secuestros_infracciones.findAll({where:{secuestro_id:id},
      include: [
        {
          model: Infracciones,
          /* as: 'Actas', */ // Este alias debe coincidir con el definido en tu asociación
          attributes: ['descrip','digesto'], 
        },
        
      ],
    });
  };


module.exports={infraccionesBySecuestroId}