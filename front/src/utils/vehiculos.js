const vehiculosSecuestrados =
[
    {
      "id": 1,
      
        "estado": "ingresado",

        "sector": "Q",
        "inventario": 87609,

        "numeroActa": 789690,
        "lugar": "Libertad756",
        "numeroInspector": 8796990809,
        "fecha": "2022-01-01",
        "hora": "12:10",

        "tipo": "Moto",
        "dominio": "A16OIHV",
        "marca": "Honda",
        "modelo": "Wave",

        "ApellidoYnombres": "Benavidez rodrigo",
        "dni": 987654321,
        "sexo": "Masculino",
        "cuil": 67568768679,

        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc J.- Por circular sin casco"
        ]

    },
    {
        "id": 2,
        "estado": "egresado",
        "sector": "A",
        "inventario": 12345,
        "numeroActa": 456123,
        "lugar": "San Martín 123",
        "numeroInspector": 1234567890,
        "fecha": "2022-05-15",
        "hora": "09:30",
        "tipo": "Automóvil",
        "dominio": "ABC123",
        "marca": "Toyota",
        "modelo": "Corolla",
        "ApellidoYnombres": "López María",
        "dni": 123456789,
        "sexo": "Femenino",
        "cuil": 20123456789,
        "infraccion/es": [
            "Art. 25 Inc. C.- Por estacionar en lugar prohibido"
        ]
    },
    {
        "id": 3,
        "estado": "ingresado",
        "sector": "B",
        "inventario": 67890,
        "numeroActa": 789456,
        "lugar": "Av. Belgrano 450",
        "numeroInspector": 9876543210,
        "fecha": "2023-03-20",
        "hora": "15:45",
        "tipo": "Camioneta",
        "dominio": "XYZ789",
        "marca": "Ford",
        "modelo": "Ranger",
        "ApellidoYnombres": "Gómez Juan",
        "dni": 456789123,
        "sexo": "Masculino",
        "cuil": 20456789123,
        "infraccion/es": [
            "Art. 30 Inc. B.- Por exceso de velocidad"
        ]
    },
    {
        "id": 4,
        "estado": "egresado",
        "sector": "C",
        "inventario": 54321,
        "numeroActa": 321654,
        "lugar": "Rivadavia 980",
        "numeroInspector": 1029384756,
        "fecha": "2023-07-08",
        "hora": "20:15",
        "tipo": "Moto",
        "dominio": "JKL456",
        "marca": "Yamaha",
        "modelo": "FZ",
        "ApellidoYnombres": "Pérez Ana",
        "dni": 654321987,
        "sexo": "Femenino",
        "cuil": 27654321987,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc J.- Por circular sin luces encendidas"
        ]
    },
    {
        "id": 5,
        "estado": "ingresado",
        "sector": "A",
        "inventario": 12345,
        "numeroActa": 987654,
        "lugar": "San Martín 123",
        "numeroInspector": 5647382910,
        "fecha": "2023-08-15",
        "hora": "14:30",
        "tipo": "Automóvil",
        "dominio": "ABC123",
        "marca": "Ford",
        "modelo": "Focus",
        "ApellidoYnombres": "López Carlos",
        "dni": 123456789,
        "sexo": "Masculino",
        "cuil": 20123456789,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc B.- Por exceso de velocidad"
        ]
    },
    {
        "id": 6,
        "estado": "egresado",
        "sector": "B",
        "inventario": 67890,
        "numeroActa": 456789,
        "lugar": "Belgrano 456",
        "numeroInspector": 9876543210,
        "fecha": "2023-09-01",
        "hora": "08:45",
        "tipo": "Moto",
        "dominio": "XYZ789",
        "marca": "Suzuki",
        "modelo": "GSX",
        "ApellidoYnombres": "Gómez María",
        "dni": 234567890,
        "sexo": "Femenino",
        "cuil": 27234567890,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc F.- Por estacionar en zona prohibida"
        ]
    },
    {
        "id": 7,
        "estado": "ingresado",
        "sector": "D",
        "inventario": 24680,
        "numeroActa": 135790,
        "lugar": "Av. Corrientes 2000",
        "numeroInspector": 8765432109,
        "fecha": "2023-05-22",
        "hora": "19:00",
        "tipo": "Automóvil",
        "dominio": "LMN890",
        "marca": "Chevrolet",
        "modelo": "Onix",
        "ApellidoYnombres": "Fernández Lucía",
        "dni": 345678901,
        "sexo": "Femenino",
        "cuil": 27345678901,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc C.- Por uso indebido de luces altas"
        ]
    },
    {
        "id": 8,
        "estado": "egresado",
        "sector": "E",
        "inventario": 13579,
        "numeroActa": 246801,
        "lugar": "Mitre 765",
        "numeroInspector": 1029384756,
        "fecha": "2023-11-30",
        "hora": "22:50",
        "tipo": "Camioneta",
        "dominio": "GHI654",
        "marca": "Toyota",
        "modelo": "Hilux",
        "ApellidoYnombres": "Martínez Juan",
        "dni": 456789012,
        "sexo": "Masculino",
        "cuil": 20456789012,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc D.- Por circular sin cinturón de seguridad"
        ]
    },
    {
        "id": 9,
        "estado": "ingresado",
        "sector": "F",
        "inventario": 98765,
        "numeroActa": 112233,
        "lugar": "Las Heras 450",
        "numeroInspector": 5647382910,
        "fecha": "2023-06-14",
        "hora": "10:20",
        "tipo": "Moto",
        "dominio": "OPQ123",
        "marca": "Kawasaki",
        "modelo": "Ninja",
        "ApellidoYnombres": "Suárez Pedro",
        "dni": 567890123,
        "sexo": "Masculino",
        "cuil": 20567890123,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc G.- Por exceso de ruidos molestos"
        ]
    },
    {
        "id": 10,
        "estado": "egresado",
        "sector": "G",
        "inventario": 11223,
        "numeroActa": 445566,
        "lugar": "Sarmiento 300",
        "numeroInspector": 6789054321,
        "fecha": "2023-10-05",
        "hora": "17:40",
        "tipo": "Automóvil",
        "dominio": "QRS456",
        "marca": "Volkswagen",
        "modelo": "Golf",
        "ApellidoYnombres": "Ramírez Sofía",
        "dni": 678901234,
        "sexo": "Femenino",
        "cuil": 27678901234,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc H.- Por circular sin documentación"
        ]
    },
    {
        "id": 11,
        "estado": "ingresado",
        "sector": "H",
        "inventario": 98761,
        "numeroActa": 667788,
        "lugar": "Av. Libertador 560",
        "numeroInspector": 2233445566,
        "fecha": "2023-09-12",
        "hora": "13:45",
        "tipo": "Automóvil",
        "dominio": "TUV890",
        "marca": "Peugeot",
        "modelo": "208",
        "ApellidoYnombres": "García Laura",
        "dni": 112233445,
        "sexo": "Femenino",
        "cuil": 27112233445,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc K.- Por circular en contramano"
        ]
    },
    {
        "id": 12,
        "estado": "egresado",
        "sector": "I",
        "inventario": 45321,
        "numeroActa": 998877,
        "lugar": "San Juan 230",
        "numeroInspector": 3344556677,
        "fecha": "2023-07-25",
        "hora": "09:10",
        "tipo": "Moto",
        "dominio": "UVW456",
        "marca": "Zanella",
        "modelo": "ZR150",
        "ApellidoYnombres": "Luna Martín",
        "dni": 223344556,
        "sexo": "Masculino",
        "cuil": 20223344556,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc L.- Por exceso de velocidad"
        ]
    },
    {
        "id": 13,
        "estado": "ingresado",
        "sector": "J",
        "inventario": 76890,
        "numeroActa": 112244,
        "lugar": "Moreno 670",
        "numeroInspector": 4455667788,
        "fecha": "2023-05-18",
        "hora": "16:30",
        "tipo": "Camioneta",
        "dominio": "WXY123",
        "marca": "Chevrolet",
        "modelo": "S10",
        "ApellidoYnombres": "Silva Roberto",
        "dni": 334455667,
        "sexo": "Masculino",
        "cuil": 20334455667,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc M.- Por estacionar en zona prohibida"
        ]
    },
    {
        "id": 14,
        "estado": "egresado",
        "sector": "K",
        "inventario": 34210,
        "numeroActa": 334455,
        "lugar": "Alsina 150",
        "numeroInspector": 5566778899,
        "fecha": "2023-10-01",
        "hora": "11:20",
        "tipo": "Automóvil",
        "dominio": "ZAB678",
        "marca": "Ford",
        "modelo": "EcoSport",
        "ApellidoYnombres": "Mendoza Carolina",
        "dni": 445566778,
        "sexo": "Femenino",
        "cuil": 27445566778,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc N.- Por circular sin cinturón de seguridad"
        ]
    },
    {
        "id": 15,
        "estado": "ingresado",
        "sector": "L",
        "inventario": 56342,
        "numeroActa": 778899,
        "lugar": "Lavalle 400",
        "numeroInspector": 6677889900,
        "fecha": "2023-08-30",
        "hora": "14:50",
        "tipo": "Moto",
        "dominio": "BCD234",
        "marca": "Gilera",
        "modelo": "VC150",
        "ApellidoYnombres": "Alvarez Javier",
        "dni": 556677889,
        "sexo": "Masculino",
        "cuil": 20556677889,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc O.- Por circular sin casco"
        ]
    },
    {
        "id": 16,
        "estado": "egresado",
        "sector": "M",
        "inventario": 90876,
        "numeroActa": 554433,
        "lugar": "Vélez Sarsfield 720",
        "numeroInspector": 7788990011,
        "fecha": "2023-06-27",
        "hora": "18:00",
        "tipo": "Automóvil",
        "dominio": "DEF345",
        "marca": "Renault",
        "modelo": "Duster",
        "ApellidoYnombres": "Ríos Juliana",
        "dni": 667788990,
        "sexo": "Femenino",
        "cuil": 27667788990,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc P.- Por falta de documentación"
        ]
    },
    {
        "id": 17,
        "estado": "ingresado",
        "sector": "N",
        "inventario": 34129,
        "numeroActa": 123456,
        "lugar": "Paso 640",
        "numeroInspector": 8899001122,
        "fecha": "2023-04-20",
        "hora": "12:35",
        "tipo": "Camioneta",
        "dominio": "GHI789",
        "marca": "Volkswagen",
        "modelo": "Amarok",
        "ApellidoYnombres": "Herrera Sergio",
        "dni": 778899001,
        "sexo": "Masculino",
        "cuil": 20778899001,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc Q.- Por circular sin luces encendidas"
        ]
    },
    {
        "id": 18,
        "estado": "egresado",
        "sector": "O",
        "inventario": 67231,
        "numeroActa": 789012,
        "lugar": "Castro Barros 890",
        "numeroInspector": 9900112233,
        "fecha": "2023-11-18",
        "hora": "21:15",
        "tipo": "Automóvil",
        "dominio": "JKL012",
        "marca": "Fiat",
        "modelo": "Uno",
        "ApellidoYnombres": "Castro Nicolás",
        "dni": 889900112,
        "sexo": "Masculino",
        "cuil": 20889900112,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc R.- Por uso indebido de luces altas"
        ]
    },
    {
        "id": 19,
        "estado": "ingresado",
        "sector": "P",
        "inventario": 32109,
        "numeroActa": 665544,
        "lugar": "Mitre 390",
        "numeroInspector": 1234567890,
        "fecha": "2023-03-02",
        "hora": "15:55",
        "tipo": "Moto",
        "dominio": "LMN234",
        "marca": "Honda",
        "modelo": "CG150",
        "ApellidoYnombres": "Villalba Patricia",
        "dni": 901122334,
        "sexo": "Femenino",
        "cuil": 27901122334,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc S.- Por falta de espejos retrovisores"
        ]
    },
    {
        "id": 20,
        "estado": "egresado",
        "sector": "Q",
        "inventario": 65432,
        "numeroActa": 443322,
        "lugar": "Belgrano 1000",
        "numeroInspector": 2345678901,
        "fecha": "2023-05-05",
        "hora": "07:20",
        "tipo": "Automóvil",
        "dominio": "OPQ567",
        "marca": "Toyota",
        "modelo": "Corolla",
        "ApellidoYnombres": "Ortiz Valeria",
        "dni": 112233445,
        "sexo": "Femenino",
        "cuil": 27112233445,
        "infraccion/es": [
            "Art. 18 Dcto. 532/09 anexo 5 Inc T.- Por circular sin patente"
        ]
    }
    

]   

export default vehiculosSecuestrados;