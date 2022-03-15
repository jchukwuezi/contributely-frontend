import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import {Document, Page, Text, PDFViewer, StyleSheet} from '@react-pdf/renderer'
import {Table, TableBody, TableCell, TableHeader, DataTableCell} from '@david.kucsai/react-pdf-table'
export const DonationPdf = () =>{
    const {state} = useLocation();  
    console.log("this pdf")
    console.log(state)
    const navigate = useNavigate();
    const today = new Date();
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#e5e5e5",
            color: "blue",
        },

        text: {
            marginBottom: "10px"
        },

        text2: {
            marginTop: "25px"
        },

        viewer: {
            width: window.innerWidth, //the pdf viewer will take up all of the width and height
            height: window.innerHeight,
          }
    })

    const MyDocument = () => (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text>Donation to Group: {state.groupName}  </Text>
                    <Text>In the name of: {state.inTheNameOf}</Text>
                    <Text style={styles.text}>{`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</Text>
                    <Table data={[{
                        initiativeName: state.initiativeName,
                        amount: state.amount
                    }]}>
                        <TableHeader>
                            <TableCell>
                                Initiative Name
                            </TableCell>
                            <TableCell>
                                Amount
                            </TableCell>
                        </TableHeader>
                        <TableBody> 
                            <DataTableCell getContent={(r) => r.initiativeName} />
                            <DataTableCell getContent={(r)=> r.amount}/>
                        </TableBody>
                    </Table>
                    <Text style={styles.text2}>Email: {state.email}</Text>
                </Page>
            </Document>
        </PDFViewer>
    )

   return(
       <MyDocument />
   )
}

export default DonationPdf;