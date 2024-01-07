import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CompanyLedger from 'views/Company/Ledgers';
import StockItem from 'views/Inventory/StockItem';
import PaymentVoucher from 'views/Voucher/PaymentVoucher';
import ReceiptVoucher from 'views/Voucher/ReceiptVoucher';
import JournalVoucher from 'views/Voucher/JournalVoucher';
import StockJournalVoucher from 'views/Voucher/StockJournalVoucher';
import PurchaseVoucher from 'views/Voucher/PurchaseVoucher';
import PurchaseOrderVoucher from 'views/Voucher/PurchaseOrderVoucher';
import SalesVoucher from 'views/Voucher/SalesVoucher';
import SalesOrderVoucher from 'views/Voucher/SalesOrderVoucher';
import SalesReturnVoucher from 'views/Voucher/SalesReturnVoucher';
import PurchaseReturnVoucher from 'views/Voucher/PurchaseReturnVoucher';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <DashboardDefault />
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />
				}
			]
		},
		{
			path: 'company',
			children: [
				// {
				// 	path: 'group',
				// 	element: <CompanyGroup />
				// },
				{
					path: 'ledgers',
					element: <CompanyLedger />
				},
			]
		},
		{
			path: 'inventory',
			children: [
				{
					path: 'stock-item',
					element: <StockItem />
				},
			]
		},
		{
			path: 'voucher',
			children: [
				{
					path: 'payment-voucher',
					element: <PaymentVoucher />
				},
				{
					path: 'receipt',
					element: <ReceiptVoucher />
				},
				{
					path: 'journal',
					element: <JournalVoucher />
				},
				{
					path: 'stock-journal',
					element: <StockJournalVoucher />
				},
				{
					path: 'purchase',
					element: <PurchaseVoucher />
				},
				{
					path: 'purchase-order',
					element: <PurchaseOrderVoucher />
				},
				{
					path: 'sales',
					element: <SalesVoucher />
				},
				{
					path: 'sales-order',
					element: <SalesOrderVoucher />
				},
				{
					path: 'sales-return',
					element: <SalesReturnVoucher />
				},
				{
					path: 'purchase-return',
					element: <PurchaseReturnVoucher />
				},
			]
		},
	]
};

export default AdminRoutes;
