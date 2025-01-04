const {/* Secuestros, */Actas/* ,Vehiculos,Infractores */}= require('../db.js');

const getActabyNro = async (nro) => {
    return await Actas.findOne({where:{nro:nro}/* ,
      include: [
        {
          model: Actas,
          
          attributes: ['nro','lugar','inspector','fecha_hora'], 
        },
        {
          model: Vehiculos,
          
          attributes: ['tipovh','dominio','marcavh','modelovh'], 
        },
        {
          model: Infractores,
          
          attributes: ['nombreCompleto','dni','sexo','cuil'], 
        },
      ], */
    });
  };


module.exports={getActabyNro}