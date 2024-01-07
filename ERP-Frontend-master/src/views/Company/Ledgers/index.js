import CustomForm from 'components/CustomForm';
import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import axiosInstance from 'axiosInstance';
import {
	bankAccountsLedgerForm,
	bankOCCAccountLedger,
	capitalAccountLedger,
	cashInHandLedger,
	currentAssetsLedger,
	currentLiabilitiesLedger,
	depositsAssetLedger,
	dutiesTaxesLedger,
	expensesDirectLedger,
	fixedAssetsLedger,
	investmentsLedger,
	loansAdvancesAssetLedger,
	loansLiabilityLedger,
	miscExpensesAssetLedger,
	provisionsLedger,
	purchaseAccountsLedger,
	reservesSurplusLedger,
	salesAccountsLedger,
	securedLoansLedger,
	stockInHandLedger,
	sundryCreditorsLedger,
	sundryDebtorsLedger,
	suspenseAccountLedger,
	unsecuredLoansLedger,

	// Not available
	branchDivisionsLedger,
	directExpensesLedger,
	directIncomesLedger,
	expensesIndirectLedger,
	incomeDirectLedger,
	incomeIndirectLedger,
	indirectExpensesLedger,
	indirectIncomesLedger
} from './Form';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function CompanyLedger() {
	const currentCompany = useSelector((state) => state.custom.currentCompany);
	const [groups, setGroups] = useState([]);
	const [ledgers, setLedgers] = useState([]);
	const [additionalFields, setAdditionalFields] = useState([]);

	const fetchAllGroups = () => {
		axiosInstance.get('/company/group/').then((response) => {
			setGroups(response.data);
		});
	};

	const fetchAllLedgers = () => {
		axiosInstance.get('/company/ledgers').then((response) => {
			setLedgers(response.data.sort((a, b) => a.group - b.group));
		});
	};

	useEffect(() => {
		fetchAllGroups();
		fetchAllLedgers();
	}, [currentCompany]);

	const formik = useFormik({
		initialValues: {
			name: '',
			category: 'trading',
			group: '',
			address: '',
			city: '',
			country: '',
			state: '',
			pincode: '',
			cr_dr: ''
		},

		onSubmit: async (values, { setErrors }) => {
			const request_data = values;

			request_data['group_name'] = groups.find((group) => group.id == request_data.group).name;
			console.log(request_data);

			try {
				await axiosInstance.post(`/company/ledger/${request_data['group_name'].replaceAll(' ', '-')}/`, request_data);
				fetchAllLedgers();
				alert('Ledger created successfully');
				formik.resetForm();
			} catch (error) {
				if (error.response && error.response.status == 400) {
					const response_data = error.response.data;
					const errors = {};

					Object.keys(response_data).forEach((field) => {
						errors[field] = response_data[field][0];
					});

					setErrors(errors);
				}
			}
		}
		// enableReinitialize: true
	});

	if (currentCompany) {
		formik.values.address = currentCompany.address;
		formik.values.city = currentCompany.city;
		formik.values.country = currentCompany.country;
		formik.values.state = currentCompany.state;
		formik.values.pincode = currentCompany.pincode;
	}

	const addLedgerForm = {
		formik: formik,
		title: 'Add Ledger',
		sections: [
			[
				{
					id: 'name',
					type: 'text',
					label: 'Ledger Name',
					params: {
						autoFocus: true,
						required: false
					}
				},
				// {
				//     id: 'category',
				//     type: 'select',
				//     label: 'Category Name',
				//     options: [
				//         {
				//             id: 'trading',
				//             name: 'Trading'
				//         },
				//         {
				//             id: 'profit_loss',
				//             name: 'Profit & Loss'
				//         },
				//         {
				//             id: 'balance_sheet',
				//             name: 'Balance Sheet'
				//         },
				//     ],
				//     params: {
				//         required: false,
				//         onChange: (e) => {
				//             formik.handleChange(e)

				//             const category = e.target.value
				//             setGroupsByCategory(groups.filter(group => group.category == category))
				//         }
				//     }
				// },
				{
					id: 'group',
					type: 'select',
					label: 'Group Name',
					options: groups,
					params: {
						required: false,
						onChange: (e) => {
							formik.handleChange(e);
							const group_id = e.target.value;
							const group = groups.find((group) => group.id == group_id);

							const ledgerForms = {
								'Bank Accounts (Banks)': bankAccountsLedgerForm,
								'Bank OCC a/c': bankOCCAccountLedger,
								1: branchDivisionsLedger,
								'Capital Account': capitalAccountLedger,
								'Cash-in-hand': cashInHandLedger,
								'Current Assets': currentAssetsLedger,
								'Current Liabilities': currentLiabilitiesLedger,
								'Deposits (Asset)': depositsAssetLedger,
								'Direct Expenses': directExpensesLedger,
								'Direct Incomes': directIncomesLedger,
								'Duties & Taxes': dutiesTaxesLedger,
								'Expenses (Direct)': expensesDirectLedger,
								'Expenses Indirect': expensesIndirectLedger,
								'Fixed Assets': fixedAssetsLedger,
								'Income Direct': incomeDirectLedger,
								'Income Indirect': incomeIndirectLedger,
								7: indirectExpensesLedger,
								8: indirectIncomesLedger,
								Investments: investmentsLedger,
								'Loans & Advances (Asset)': loansAdvancesAssetLedger,
								'Loans (Liability)': loansLiabilityLedger,
								'Misc. Expenses (Asset)': miscExpensesAssetLedger,
								Provisions: provisionsLedger,
								'Purchase Account': purchaseAccountsLedger,
								'Reserves & Surplus': reservesSurplusLedger,
								'Sales Account': salesAccountsLedger,
								'Secured Loans': securedLoansLedger,
								'Stock-in-hand': stockInHandLedger,
								'Sundry Creditors / Our Purchase': sundryCreditorsLedger,
								'Sundry Debtors / Our Sales': sundryDebtorsLedger,
								'Suspense Account': suspenseAccountLedger,
								'Unsecured Loans': unsecuredLoansLedger
							};

							const findTopParentGroup = (group_id) => {
								const group = groups.find((group) => group.id == group_id);

								if (group.parent == null) {
									return group;
								}

								return findTopParentGroup(group.parent);
							};

							console.log('Group:', group);
							const parentGroup = findTopParentGroup(group.id);
							console.log('Top Parent Group:', parentGroup);

							// const ledger = ledgerForms[group.name]
							const ledger = ledgerForms[group.name] || ledgerForms[parentGroup.name] || [];
							ledger.push({
								id: 'opening_balance',
								type: 'text',
								label: 'Opening Balance',
								params: {
									required: false
								}
							});
							ledger.push({
								id: 'cr_dr',
								type: 'select',
								label: 'CR / DR',
								options: [
									{
										id: 'CR',
										name: 'CR'
									},
									{
										id: 'DR',
										name: 'DR'
									}
								],
								params: {
									required: true
								}
							});
							ledger?.map((field) => {
								formik.setFieldValue(field.id, '');
							});

							formik.setFieldValue('show_address', !['Capital Account', 'Duties & Taxes'].includes(group.name));
							setAdditionalFields(ledger);
						}
					}
				}
			]
		]
	};

	// Additional Fields
	// const [countries, setCountries] = useState([])
	// const [states, setStates] = useState([])
	// const [currentCountry, setCurrentCountry] = useState()

	// useEffect(() => {
	//     axiosInstance.get('/company/country/').then((response) => {
	//         setCountries(response.data)
	//         response.data.length > 0 && setCurrentCountry(response.data[0].id)
	//     })
	// }, [])

	// useEffect(() => {
	//     currentCountry && axiosInstance.get(`/company/country/${currentCountry}/`).then((response) => {
	//         console.log(response.data)
	//         setStates(response.data.states)
	//     }).catch((error) => {
	//         console.error('Axios Error:', error);
	//     })

	// }, [currentCountry])

	return (
		<>
			<MainCard title="Ledgers">
				<CustomForm form={addLedgerForm} additionalFields={additionalFields} />

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Group</TableCell>
								<TableCell>Opening Balance</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ledgers.map((row, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{groups.find((group) => group.id == row.group)?.name}</TableCell>
									<TableCell>{row.opening_balance}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</MainCard>
		</>
	);
}
