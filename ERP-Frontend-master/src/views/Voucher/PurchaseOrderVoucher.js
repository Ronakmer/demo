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
        axiosInstance.get('/voucher/purchase-order-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    useEffect(() => {
        fetchAllVouchers()
        fetchLedgersForVoucher()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            party_ac_name: '',
            purchase_ledger: '',
            name_of_item: '',
            order_no: '',
            quantity: '',
            rate: '',
            amount: '',
            narration: '',
            date: new Date().toISOString().split('T')[0],
        },
        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/voucher/purchase-order-voucher/', request_data)
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
        title: 'Add Purchase Order Voucher',
        sections: [
            [
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
                    id: 'purchase_ledger',
                    type: 'select',
                    label: 'Purchase Ledger',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'name_of_item',
                    type: 'text',
                    label: 'Name Of Item',
                },
                {
                    id: 'order_no',
                    type: 'number',
                    label: 'Order No',
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
                    id: 'amount',
                    type: 'number',
                    label: 'Amount',
                },
                {
                    id: 'date',
                    type: 'date',
                    label: 'Date',
                },
                {
                    id: 'narration',
                    type: 'text',
                    label: 'Narration',
                },
            ],
        ]
    }
    return (
        <MainCard title="Purchase Order Vouchers">
            <CustomForm form={addVoucherForm} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Party A/c Name</TableCell>
                            <TableCell>Purchase Ledger</TableCell>
                            <TableCell>Name Of Item</TableCell>
                            <TableCell>Order No</TableCell>
                            {/* <TableCell>By To Type</TableCell> */}
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Narration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                {/* <TableCell>{ledgers.find(ledger => ledger.id == row.from_account)?.name}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.to_account)?.name}</TableCell> */}
                                <TableCell>{row.party_ac_name}</TableCell>
                                <TableCell>{row.purchase_ledger}</TableCell>
                                <TableCell>{row.name_of_item}</TableCell>
                                <TableCell>{row.order_no}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                {/* <TableCell>{row.by_to_type}</TableCell> */}
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.narration ? row.narration : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
