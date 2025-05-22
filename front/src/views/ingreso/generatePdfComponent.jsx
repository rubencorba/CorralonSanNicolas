import { Document, Page, Text, View, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import QRCode from "qrcode"; // Se usa QRCode de 'qrcode' para generar la imagen del QR
import snLogo from "./snLogo.png";

export const generatePdf = async ({ idSecuestro, nroActa }) => {
  try {
    // Generar el QR en base64
    const qrImage = await QRCode.toDataURL(`${idSecuestro}`);

    // Crear el documento PDF
    const doc = (
      <Document>
        <Page size={["62mm", "100mm"]} style={styles.page}>
          <View style={styles.container}>
            <Image src={qrImage} style={styles.qr} />
            <Text style={styles.text}>Acta: {nroActa}</Text>
            <Image src={snLogo} style={styles.logo} />
          </View>
        </Page>
      </Document>
    );

    // Convertir a Blob y descargar el archivo
    const pdfBlob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR_Secuestro_${nroActa}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return "PDF generado con éxito"; // En caso de éxito
  } catch (error) {
    return "Error al generar el PDF"; // En caso de error
  }
};

// Estilos para el PDF (62mm x 100mm)
const styles = StyleSheet.create({
  page: {
    /* padding: 2, */
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  qr: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    /* marginTop: 1, */
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 25,
    marginTop: 1,
  },
});
