import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function ReceiptVoucher() {
    const [vouchers, setVouchers] = useState([])
    const [ledgers, setLedgers] = useState([])

    const currentCompany = useSelector((state) => state.custom.currentCompany);

    const fetchLedgersForVoucher = () => {
        axiosInstance.get('/company/voucher-ledgers').then((response) => {
            setLedgers(response.data)
        })
    }

    const fetchAllVouchers = () => {
        axiosInstance.get('/voucher/receipt-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    useEffect(() => {
        fetchAllVouchers()
        fetchLedgersForVoucher()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            account: '',
            from_party: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            narration: '',
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/voucher/receipt-voucher/', request_data)
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
        title: 'Add Receipt Voucher',
        sections: [
            [
                {
                    id: 'account',
                    type: 'select',
                    label: 'Account',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'from_party',
                    type: 'select',
                    label: 'From Party',
                    options: ledgers,
                    params: {
                        required: true,
                    }
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
        <MainCard title="Receipt Vouchers">
            <CustomForm form={addVoucherForm} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell>From Party</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Narration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.account)?.name}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.from_party)?.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
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
