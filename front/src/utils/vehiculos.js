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
    }
]   

export default vehiculosSecuestrados;