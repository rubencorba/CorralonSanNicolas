const {Secuestros,Actas,Vehiculos,Infractores}= require('../db.js');

const secuestroDetailById = async (id) => {
    return await Secuestros.findOne({where:{id_mysql:id},
      include: [
        {
          model: Actas,
          /* as: 'Actas', */ // Este alias debe coincidir con el definido en tu asociación
          attributes: ['nro','lugar','inspector','fecha_hora'], 
        },
        {
          model: Vehiculos,
          
          attributes: ['tipovh','dominio','marcavh','modelovh'], 
        },
        {
          model: Infractores,
          
          attributes: ['apynom','dni','sexo','cuil'], 
        },
      ],
    });
  };


module.exports={secuestroDetailById}