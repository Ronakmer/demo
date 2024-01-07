import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function StockJournalVoucher() {
    const [vouchers, setVouchers] = useState([])
    const [ledgers, setLedgers] = useState([])

    const currentCompany = useSelector((state) => state.custom.currentCompany);

    const fetchLedgersForVoucher = () => {
        axiosInstance.get('/company/voucher-ledgers').then((response) => {
            setLedgers(response.data)
        })
    }

    const fetchAllVouchers = () => {
        axiosInstance.get('/voucher/purchase-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    useEffect(() => {
        fetchAllVouchers()
        fetchLedgersForVoucher()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            supplier_invoice_no: '',
            party_ac_name: '',
            party_invoce_date: '',
            purchase_ledger: '',
            stock_item: '',
            godown: '',
            quantity: '',
            rate: '',
            i_gst: '',
            c_gst: '',
            s_gst: '',
            destination: '',
            carrier_name: '',
            bill_of_lading: '',
            motor_vehicle_no: '',
            amount: '',
            narration: '',
            date: new Date().toISOString().split('T')[0],
        },
        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/voucher/purchase-voucher/', request_data)
                fetchAllVouchers()
                alert('Voucher added successfully');
                formik.resetForm()
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data
                    const errors = {}

                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                    });
                    setErrors(errors)
                }
            }
        }
    })
    const addVoucherForm = {
        formik: formik,
        title: 'Add Purchase Voucher',
        sections: [
            [
                {
                    id: 'supplier_invoice_no',
                    type: 'number',
                    label: 'Supplier Invoice No',
                },
                {
                    id: 'party_ac_name',
                    type: 'select',
                    label: 'Party A/c Name',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'party_invoice_date',
                    type: 'number',
                    label: 'Party Invoice Date',
                },
                {
                    id: 'sales_ledger',
                    type: 'select',
                    label: 'Sales Ledger',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'stock_item',
                    type: 'text',
                    label: 'Stock Item',
                },
                {
                    id: 'godown',
                    type: 'select',
                    label: 'Godown',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'quantity',
                    type: 'number',
                    label: 'Quantity',
                },
                {
                    id: 'rate',
                    type: 'number',
                    label: 'Rate',
                },
                {
                    id: 'i_gst',
                    type: 'number',
                    label: 'I-GST',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'c_gst',
                    type: 'number',
                    label: 'C-GST',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 's_gst',
                    type: 'number',
                    label: 'S-GST',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'destination',
                    type: 'number',
                    label: 'Destination',
                },
                {
                    id: 'carrier_name',
                    type: 'text',
                    label: 'Carrier Name',
                },
                {
                    id: 'bill_of_lading',
                    type: 'number',
                    label: 'Bill of Lading',
                },
                {
                    id: 'motor_vehicle_no',
                    type: 'number',
                    label: 'Motor Vehicle No',
                },
                {
                    id: 'amount',
                    type: 'number',
                    label: 'Amount',
                },
                {
                    id: 'narration',
                    type: 'text',
                    label: 'Narration',
                },
                {
                    id: 'date',
                    type: 'date',
                    label: 'Date',
                },
            ],
        ]
    }
    return (
        <MainCard title="Purchase Vouchers">
            <CustomForm form={addVoucherForm} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Supplier Invoice No</TableCell>
                            <TableCell>Party A/c Name</TableCell>
                            <TableCell>Party Invoice Date</TableCell>
                            <TableCell>Purchase Ledger</TableCell>
                            <TableCell>Stock Item</TableCell>
                            <TableCell>Godown</TableCell>
                            {/* <TableCell>By To Type</TableCell> */}
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Narration</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                {/* <TableCell>{ledgers.find(ledger => ledger.id == row.from_account)?.name}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.to_account)?.name}</TableCell> */}
                                <TableCell>{row.supplier_invoice_no}</TableCell>
                                <TableCell>{row.party_ac_name}</TableCell>
                                <TableCell>{row.party_invoce_date}</TableCell>
                                <TableCell>{row.sales_ledger}</TableCell>
                                <TableCell>{row.stock_item}</TableCell>
                                <TableCell>{row.godown}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                {/* <TableCell>{row.by_to_type}</TableCell> */}
                                <TableCell>{row.narration ? row.narration : '-'}</TableCell>
                                <TableCell>{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
