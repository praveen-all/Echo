import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const TableComp = ({ payment }) => {
  return (
    <TableContainer className="container" marginTop={"20px"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th backgroundColor={"gray"} color={"white"} textAlign={"center"}>
              Amount
            </Th>
            <Th backgroundColor={"gray"} color={"white"} textAlign={"center"}>
              method
            </Th>
            <Th backgroundColor={"gray"} color={"white"} textAlign={"center"}>
              Date
            </Th>
            <Th
              isNumeric
              backgroundColor={"gray"}
              color={"white"}
              textAlign={"center"}
            >
              Payment ID
            </Th>
            <Th
              isNumeric
              backgroundColor={"gray"}
              color={"white"}
              textAlign={"center"}
            >
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {payment &&
            payment
              .map((el) => el.data())
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((paymentt) => {
                return (
                  <Tr>
                    <Td textAlign={"center"}>{paymentt.amount}</Td>
                    <Td textAlign={"center"}>{paymentt.method}</Td>
                    <Td isNumeric textAlign={"center"}>
                      {paymentt.date}
                    </Td>
                    <Td isNumeric textAlign={"center"}>
                      {paymentt.paymentId}
                    </Td>
                    <Td textAlign={"center"}>
                      {Math.round(
                        -(
                          new Date(paymentt.date).getTime() -
                          new Date().getTime()
                        ) / 86400000
                      ) <= paymentt.days ? (
                        <span style={{ color: "green" }}>Live</span>
                      ) : (
                        <span style={{ color: "red" }}>Close</span>
                      )}
                    </Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
