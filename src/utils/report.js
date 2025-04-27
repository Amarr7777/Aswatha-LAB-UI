// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// // Load the default font (you can add custom fonts if needed)
// const addCustomStyles = (doc) => {
//     doc.setFont("helvetica", "normal");
// };

// // Generate Lab Report PDF
// export const generateLabReport = (record) => {
//     const doc = new jsPDF();

//     // Lab Letterhead Details
// const labName = "ASWATHI CLINICAL LABORATORY & E.C.G";
// const labAddress = "opp P H C Vallethode, Ezhupunna South";
// const labPhone = "(+91) 8606566142";
// const labEmail = "aswathylab234@gmail.com";

//     // Colors
//     const primaryColor = "#181E3B"; // Deep blue
//     const secondaryColor = "#F0F4F8"; // Light background color
//     const textColor = "#4B4B4B"; // Dark gray
//     const headingColor = "#0D2F3E"; // Rich teal for headings
//     const infoCardColor = "#FFFFFF"; // Soft background for info cards


//     // Letterhead
//     doc.setFillColor(primaryColor);
//     doc.rect(0, 0, 210, 50, "F");

//     // Lab Name and Details
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(255, 255, 255);
//     doc.text(labName, 14, 20);
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text(labAddress, 14, 30);
//     doc.text(`Phone: ${labPhone}`, 14, 35);
//     doc.text(`Email: ${labEmail}`, 14, 40);

//     // Patient Information - Compact Layout
//     const patientInfo = [
//         { label: "Name", value: `${record.firstName} ${record.middleName || ""} ${record.lastName}` },
//         { label: "Sex", value: record.sex || "N/A" },
//         { label: "Age", value: String(record.age || "N/A") },
//         { label: "Test", value: record.test || "N/A" },
//         { label: "Date", value: new Date(record.createdAt).toLocaleDateString() || "N/A" },
//     ];

//     // Draw Info Card Background
//     const cardTopY = 60;
//     doc.setFillColor(infoCardColor);
//     doc.rect(14, cardTopY, 182, 50, "F");

//     // Add Patient Info in a Compact Format
//     doc.setFontSize(12);
//     doc.setFont("helvetica");
//     doc.setTextColor(headingColor);
//     let yPos = cardTopY + 5;

//     // First Line (Name and Sex)
//     doc.text(`${patientInfo[0].label}: ${patientInfo[0].value} | ${patientInfo[1].label}: ${patientInfo[1].value}`, 14, yPos);

//     // Second Line (Age, Test)
//     // yPos += 8;
//     doc.text(`${patientInfo[2].label}: ${patientInfo[2].value} | ${patientInfo[3].label}: ${patientInfo[3].value}`, 134, yPos);

//     // Third Line (Date)
//     yPos += 8;
//     doc.text(`${patientInfo[4].label}: ${patientInfo[4].value}`, 14, yPos);


//     // Parameters Table
//     autoTable(doc, {
//         head: [["Parameter", "Value", "Unit", "Reference"]],
//         body: record.parameters.map((param) => [
//             param.parameter || "N/A",
//             param.value || "N/A",
//             param.unit || "N/A",
//             param.reference || "N/A",
//         ]),
//         startY: yPos + 15,
//         theme: "grid", // Use grid theme for a more structured look
//         headStyles: {
//             fillColor: primaryColor,
//             textColor: [255, 255, 255],
//             fontSize: 12,
//             fontStyle: "bold",
//         },
//         bodyStyles: {
//             textColor: textColor,
//             fontSize: 10,
//         },
//         alternateRowStyles: {
//             fillColor: secondaryColor,
//         },
//         columnStyles: {
//             0: { cellWidth: 60 },
//             1: { cellWidth: 40 },
//             2: { cellWidth: 30 },
//             3: { cellWidth: 50 },
//         },
//         margin: { left: 14, right: 14 },
//         styles: {
//             cellPadding: 5,
//             font: "helvetica",
//             lineWidth: 0.2,
//             lineColor: primaryColor,
//         },
//     });

//     // Footer
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(100, 100, 100);
//         doc.text(
//             `Page ${i} of ${pageCount}`,
//             196,
//             287,
//             { align: "right" }
//         );
//         doc.text(
//             `© ${new Date().getFullYear()} ${labName}`,
//             14,
//             287
//         );

//     }
//     // Save PDF
//     doc.save(`${record.firstName}_${record.lastName}_LabReport.pdf`);
// };



import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateLabReport = (record) => {
    const doc = new jsPDF();
    const labName = "ASWATHI CLINICAL LABORATORY & E.C.G";
    const labAddress = "opp P H C Vallethode, Ezhupunna South";
    const labPhone = "(+91) 8606566142";
    const labEmail = "aswathylab234@gmail.com";

    // --- Header ---
    doc.setFillColor("#005566");
    doc.rect(0, 0, 210, 40, "F");

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(labName, 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(labAddress, 14, 22);
    doc.text(`Phone: ${labPhone} | Email: ${labEmail}`, 14, 28);

    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    // --- Patient and Sample Info ---
    // Left Box: Patient Info
    doc.setFillColor("#E6F3F3");
    doc.rect(14, 56, 90, 30, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(`Name: ${record.firstName} ${record.middleName || ""} ${record.lastName}`, 16, 62);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Age: ${record.age} | Sex: ${record.sex}`, 16, 68);
    doc.text(`UHID: ${record._id || "N/A"}`, 16, 74);

    // Right Box: Sample Info
    doc.setFillColor("#F1F8F9");
    doc.rect(108, 56, 88, 30, "F");

    doc.setFont("helvetica", "bold");
    doc.text("Sample Collected At: Aswathi Clinial Lab", 110, 62);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    // doc.text(record.sampleAddress || "Aswathi Clinial Lab", 110, 68);
    doc.text(`Sample By: ${record.sampleBy || "Smitha Manoj"}`, 110, 68);
    // doc.text(`Ref: ${record.refBy || "N/A"}`, 110, 60);

    // --- Main Test Section ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#005566");
    doc.text(record.test.toUpperCase(), 14, 95);

    // const mainResult = record.parameters[0]?.value || "N/A";
    const mainFlag = record.parameters[0]?.flag || "";

    // doc.setFontSize(20);
    // doc.setTextColor(mainFlag === "High" ? "red" : "green");
    // doc.text(`${mainResult}`, 14, 85);

    // doc.setFontSize(10);
    // doc.setTextColor("#000000");
    // doc.text(`Reference: ${record.parameters[0]?.reference || "N/A"} ${record.parameters[0]?.unit || ""}`, 14, 92);

    // --- Results Table ---
    autoTable(doc, {
        startY: 100,
        head: [["Parameter", "Result", "Unit", "Reference Range"]],
        body: record.parameters.map((param) => [
            param.parameter || "N/A",
            param.value || "N/A",
            param.unit || "N/A",
            param.reference || "N/A",
        ]),
        theme: "grid",
        headStyles: {
            fillColor: "#005566",
            textColor: [255, 255, 255],
            fontSize: 11,
        },
        bodyStyles: {
            textColor: "#333333",
            fontSize: 10,
        },
        margin: { left: 14, right: 14 },
        styles: {
            font: "helvetica",
            cellPadding: 3,
        },
    });

    // --- Footer ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, 200, 290, { align: "right" });
        doc.text(`Generated by ${labName} | © ${new Date().getFullYear()}`, 14, 290);
    }

    // --- Save or Return the PDF ---
    doc.save(`${record.firstName}_${record.lastName}_LabReport.pdf`);
};