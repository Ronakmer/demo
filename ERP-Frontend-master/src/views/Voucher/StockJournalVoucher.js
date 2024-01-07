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
        axiosInstance.get('/voucher/stock-journal-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    useEffect(() => {
        fetchAllVouchers()
        fetchLedgersForVoucher()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            from_godown: '',
            to_godown: '',
            // by_to_type: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            narration: '',
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/voucher/stock-journal-voucher/', request_data)
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
        title: 'Add Stock Journal Voucher',
        sections: [
            [
                {
                    id: 'from_godown',
                    type: 'select',
                    label: 'From Godown',
                    options: ledgers,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'to_godown',
                    type: 'select',
                    label: 'To Godown',
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
                // {
                //     id: 'by_to_type',
                //     type: 'select',
                //     label: 'By To Type',
                //     options: [
                //         {
                //             id: 'by',
                //             name: 'BY'
                //         },
                //         {
                //             id: 'to',
                //             name: 'TO'
                //         },
                //     ],
                //     params: {
                //         required: true,
                //     }
                // },
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
        <MainCard title="Stock Journal Vouchers">
            <CustomForm form={addVoucherForm} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>From Godown</TableCell>
                            <TableCell>To Godown</TableCell>
                            <TableCell>Amount</TableCell>
                            {/* <TableCell>By To Type</TableCell> */}
                            <TableCell>Date</TableCell>
                            <TableCell>Narration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.from_godown)?.name}</TableCell>
                                <TableCell>{ledgers.find(ledger => ledger.id == row.to_godown)?.name}</TableCell>
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
