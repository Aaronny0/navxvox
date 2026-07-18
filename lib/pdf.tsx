import React from 'react';
import { Document, Page, Text, View, StyleSheet, renderToStream } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11, color: "#333" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#eee" },
  logoText: { fontSize: 24, fontWeight: "bold", color: "#0d3d66" },
  title: { fontSize: 20, fontWeight: "bold", color: "#111", marginBottom: 5 },
  label: { fontSize: 10, color: "#6b7280", marginBottom: 2 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 10, color: "#111", textTransform: "uppercase" },
  row: { flexDirection: "row", marginBottom: 5 },
  colHalf: { width: "50%" },
  bold: { fontWeight: "bold", color: "#111" },
  table: { width: "100%", marginTop: 20 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f9fafb", padding: 8, borderBottomWidth: 1, borderBottomColor: "#e5e7eb", fontWeight: "bold" },
  tableRow: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  colDesc: { width: "50%" },
  colQty: { width: "15%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },
  totals: { width: "40%", alignSelf: "flex-end", marginTop: 20 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  totalRowBold: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, fontWeight: "bold", fontSize: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 5 },
  terms: { marginTop: 40, fontSize: 9, color: "#6b7280" }
});

type DocumentData = {
  id: string;
  number: string;
  createdAt: Date;
  validUntil?: Date | null;
  dueDate?: Date | null;
  amountHT: number;
  amountTTC: number;
  tvaRate: number;
  project?: { name: string };
  client: { companyName: string, firstName: string, lastName: string, address: string | null };
  lines: { description: string, quantity: number, unitPriceHT: number }[];
};

export const NovavoxDocument = ({ data, type }: { data: DocumentData, type: "DEVIS" | "FACTURE" }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>NOVAVOX</Text>
          <Text style={{ marginTop: 5, color: "#6b7280" }}>Agence Créative & Digitale</Text>
          <Text style={{ color: "#6b7280" }}>novavox30@gmail.com</Text>
        </View>
        <View style={{ textAlign: "right" }}>
          <Text style={styles.title}>{type}</Text>
          <Text style={styles.label}>N° : {data.number}</Text>
          <Text style={styles.label}>Date : {new Date(data.createdAt).toLocaleDateString("fr-FR")}</Text>
          {data.validUntil && <Text style={styles.label}>Valide jusqu’au : {new Date(data.validUntil).toLocaleDateString("fr-FR")}</Text>}
          {data.dueDate && <Text style={styles.label}>Échéance : {new Date(data.dueDate).toLocaleDateString("fr-FR")}</Text>}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.colHalf}>
            <Text style={styles.sectionTitle}>Émetteur</Text>
            <Text style={styles.bold}>NOVAVOX</Text>
            <Text>Cotonou, Bénin</Text>
            <Text>Tél. : 01 62 08 91 61</Text>
            <Text>Email : novavox30@gmail.com</Text>
          </View>
          <View style={styles.colHalf}>
            <Text style={styles.sectionTitle}>Client</Text>
            <Text style={styles.bold}>{data.client.companyName}</Text>
            <Text>{data.client.firstName} {data.client.lastName}</Text>
            {data.client.address && <Text>{data.client.address}</Text>}
          </View>
        </View>
      </View>

      {data.project && (
        <View style={styles.section}>
          <Text style={styles.label}>Projet concerné :</Text>
          <Text style={styles.bold}>{data.project.name}</Text>
        </View>
      )}

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Quantité</Text>
          <Text style={styles.colPrice}>Prix Unit. HT</Text>
          <Text style={styles.colTotal}>Total HT</Text>
        </View>

        {data.lines.map((line, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colDesc}>{line.description}</Text>
            <Text style={styles.colQty}>{line.quantity}</Text>
            <Text style={styles.colPrice}>{line.unitPriceHT.toFixed(2)} €</Text>
            <Text style={styles.colTotal}>{(line.quantity * line.unitPriceHT).toFixed(2)} €</Text>
          </View>
        ))}
      </View>

      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text>Total HT</Text>
          <Text>{data.amountHT.toFixed(2)} €</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>TVA ({data.tvaRate}%)</Text>
          <Text>{(data.amountTTC - data.amountHT).toFixed(2)} €</Text>
        </View>
        <View style={styles.totalRowBold}>
          <Text>Total TTC</Text>
          <Text>{data.amountTTC.toFixed(2)} €</Text>
        </View>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Text style={styles.terms}>
          Conditions et mentions légales :
          {type === "DEVIS" 
            ? "\nDevis valable 30 jours à compter de sa date d'émission. Acompte de 30% à la signature du devis. Le solde sera facturé à la livraison du projet."
            : "\nFacture payable sous 30 jours à compter de sa date de réception. Aucun escompte consenti pour règlement anticipé. En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée."}
        </Text>
      </View>
    </Page>
  </Document>
);

export async function generateQuotePDF(data: DocumentData) {
  return await renderToStream(<NovavoxDocument data={data} type="DEVIS" />);
}

export async function generateInvoicePDF(data: DocumentData) {
  return await renderToStream(<NovavoxDocument data={data} type="FACTURE" />);
}
