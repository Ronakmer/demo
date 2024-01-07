import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip
} from '@mui/material';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from 'axiosInstance';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCompany as setCurrentReduxCompany } from 'store/customActions';
import { useRef } from 'react';
import { Settings } from '@mui/icons-material';
import Address from 'components/Address';

const currency = Object.entries({
    USD: {
        symbol: '$',
        name: 'US Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'USD',
        name_plural: 'US dollars'
    },
    CAD: {
        symbol: 'CA$',
        name: 'Canadian Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'CAD',
        name_plural: 'Canadian dollars'
    },
    EUR: {
        symbol: '€',
        name: 'Euro',
        symbol_native: '€',
        decimal_digits: 2,
        rounding: 0,
        code: 'EUR',
        name_plural: 'euros'
    },
    AED: {
        symbol: 'AED',
        name: 'United Arab Emirates Dirham',
        symbol_native: 'د.إ.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'AED',
        name_plural: 'UAE dirhams'
    },
    AFN: {
        symbol: 'Af',
        name: 'Afghan Afghani',
        symbol_native: '؋',
        decimal_digits: 0,
        rounding: 0,
        code: 'AFN',
        name_plural: 'Afghan Afghanis'
    },
    ALL: {
        symbol: 'ALL',
        name: 'Albanian Lek',
        symbol_native: 'Lek',
        decimal_digits: 0,
        rounding: 0,
        code: 'ALL',
        name_plural: 'Albanian lekë'
    },
    AMD: {
        symbol: 'AMD',
        name: 'Armenian Dram',
        symbol_native: 'դր.',
        decimal_digits: 0,
        rounding: 0,
        code: 'AMD',
        name_plural: 'Armenian drams'
    },
    ARS: {
        symbol: 'AR$',
        name: 'Argentine Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'ARS',
        name_plural: 'Argentine pesos'
    },
    AUD: {
        symbol: 'AU$',
        name: 'Australian Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'AUD',
        name_plural: 'Australian dollars'
    },
    AZN: {
        symbol: 'man.',
        name: 'Azerbaijani Manat',
        symbol_native: 'ман.',
        decimal_digits: 2,
        rounding: 0,
        code: 'AZN',
        name_plural: 'Azerbaijani manats'
    },
    BAM: {
        symbol: 'KM',
        name: 'Bosnia-Herzegovina Convertible Mark',
        symbol_native: 'KM',
        decimal_digits: 2,
        rounding: 0,
        code: 'BAM',
        name_plural: 'Bosnia-Herzegovina convertible marks'
    },
    BDT: {
        symbol: 'Tk',
        name: 'Bangladeshi Taka',
        symbol_native: '৳',
        decimal_digits: 2,
        rounding: 0,
        code: 'BDT',
        name_plural: 'Bangladeshi takas'
    },
    BGN: {
        symbol: 'BGN',
        name: 'Bulgarian Lev',
        symbol_native: 'лв.',
        decimal_digits: 2,
        rounding: 0,
        code: 'BGN',
        name_plural: 'Bulgarian leva'
    },
    BHD: {
        symbol: 'BD',
        name: 'Bahraini Dinar',
        symbol_native: 'د.ب.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'BHD',
        name_plural: 'Bahraini dinars'
    },
    BIF: {
        symbol: 'FBu',
        name: 'Burundian Franc',
        symbol_native: 'FBu',
        decimal_digits: 0,
        rounding: 0,
        code: 'BIF',
        name_plural: 'Burundian francs'
    },
    BND: {
        symbol: 'BN$',
        name: 'Brunei Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BND',
        name_plural: 'Brunei dollars'
    },
    BOB: {
        symbol: 'Bs',
        name: 'Bolivian Boliviano',
        symbol_native: 'Bs',
        decimal_digits: 2,
        rounding: 0,
        code: 'BOB',
        name_plural: 'Bolivian bolivianos'
    },
    BRL: {
        symbol: 'R$',
        name: 'Brazilian Real',
        symbol_native: 'R$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BRL',
        name_plural: 'Brazilian reals'
    },
    BWP: {
        symbol: 'BWP',
        name: 'Botswanan Pula',
        symbol_native: 'P',
        decimal_digits: 2,
        rounding: 0,
        code: 'BWP',
        name_plural: 'Botswanan pulas'
    },
    BYN: {
        symbol: 'Br',
        name: 'Belarusian Ruble',
        symbol_native: 'руб.',
        decimal_digits: 2,
        rounding: 0,
        code: 'BYN',
        name_plural: 'Belarusian rubles'
    },
    BZD: {
        symbol: 'BZ$',
        name: 'Belize Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BZD',
        name_plural: 'Belize dollars'
    },
    CDF: {
        symbol: 'CDF',
        name: 'Congolese Franc',
        symbol_native: 'FrCD',
        decimal_digits: 2,
        rounding: 0,
        code: 'CDF',
        name_plural: 'Congolese francs'
    },
    CHF: {
        symbol: 'CHF',
        name: 'Swiss Franc',
        symbol_native: 'CHF',
        decimal_digits: 2,
        rounding: 0.05,
        code: 'CHF',
        name_plural: 'Swiss francs'
    },
    CLP: {
        symbol: 'CL$',
        name: 'Chilean Peso',
        symbol_native: '$',
        decimal_digits: 0,
        rounding: 0,
        code: 'CLP',
        name_plural: 'Chilean pesos'
    },
    CNY: {
        symbol: 'CN¥',
        name: 'Chinese Yuan',
        symbol_native: 'CN¥',
        decimal_digits: 2,
        rounding: 0,
        code: 'CNY',
        name_plural: 'Chinese yuan'
    },
    COP: {
        symbol: 'CO$',
        name: 'Colombian Peso',
        symbol_native: '$',
        decimal_digits: 0,
        rounding: 0,
        code: 'COP',
        name_plural: 'Colombian pesos'
    },
    CRC: {
        symbol: '₡',
        name: 'Costa Rican Colón',
        symbol_native: '₡',
        decimal_digits: 0,
        rounding: 0,
        code: 'CRC',
        name_plural: 'Costa Rican colóns'
    },
    CVE: {
        symbol: 'CV$',
        name: 'Cape Verdean Escudo',
        symbol_native: 'CV$',
        decimal_digits: 2,
        rounding: 0,
        code: 'CVE',
        name_plural: 'Cape Verdean escudos'
    },
    CZK: {
        symbol: 'Kč',
        name: 'Czech Republic Koruna',
        symbol_native: 'Kč',
        decimal_digits: 2,
        rounding: 0,
        code: 'CZK',
        name_plural: 'Czech Republic korunas'
    },
    DJF: {
        symbol: 'Fdj',
        name: 'Djiboutian Franc',
        symbol_native: 'Fdj',
        decimal_digits: 0,
        rounding: 0,
        code: 'DJF',
        name_plural: 'Djiboutian francs'
    },
    DKK: {
        symbol: 'Dkr',
        name: 'Danish Krone',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'DKK',
        name_plural: 'Danish kroner'
    },
    DOP: {
        symbol: 'RD$',
        name: 'Dominican Peso',
        symbol_native: 'RD$',
        decimal_digits: 2,
        rounding: 0,
        code: 'DOP',
        name_plural: 'Dominican pesos'
    },
    DZD: {
        symbol: 'DA',
        name: 'Algerian Dinar',
        symbol_native: 'د.ج.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'DZD',
        name_plural: 'Algerian dinars'
    },
    EEK: {
        symbol: 'Ekr',
        name: 'Estonian Kroon',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'EEK',
        name_plural: 'Estonian kroons'
    },
    EGP: {
        symbol: 'EGP',
        name: 'Egyptian Pound',
        symbol_native: 'ج.م.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'EGP',
        name_plural: 'Egyptian pounds'
    },
    ERN: {
        symbol: 'Nfk',
        name: 'Eritrean Nakfa',
        symbol_native: 'Nfk',
        decimal_digits: 2,
        rounding: 0,
        code: 'ERN',
        name_plural: 'Eritrean nakfas'
    },
    ETB: {
        symbol: 'Br',
        name: 'Ethiopian Birr',
        symbol_native: 'Br',
        decimal_digits: 2,
        rounding: 0,
        code: 'ETB',
        name_plural: 'Ethiopian birrs'
    },
    GBP: {
        symbol: '£',
        name: 'British Pound Sterling',
        symbol_native: '£',
        decimal_digits: 2,
        rounding: 0,
        code: 'GBP',
        name_plural: 'British pounds sterling'
    },
    GEL: {
        symbol: 'GEL',
        name: 'Georgian Lari',
        symbol_native: 'GEL',
        decimal_digits: 2,
        rounding: 0,
        code: 'GEL',
        name_plural: 'Georgian laris'
    },
    GHS: {
        symbol: 'GH₵',
        name: 'Ghanaian Cedi',
        symbol_native: 'GH₵',
        decimal_digits: 2,
        rounding: 0,
        code: 'GHS',
        name_plural: 'Ghanaian cedis'
    },
    GNF: {
        symbol: 'FG',
        name: 'Guinean Franc',
        symbol_native: 'FG',
        decimal_digits: 0,
        rounding: 0,
        code: 'GNF',
        name_plural: 'Guinean francs'
    },
    GTQ: {
        symbol: 'GTQ',
        name: 'Guatemalan Quetzal',
        symbol_native: 'Q',
        decimal_digits: 2,
        rounding: 0,
        code: 'GTQ',
        name_plural: 'Guatemalan quetzals'
    },
    HKD: {
        symbol: 'HK$',
        name: 'Hong Kong Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'HKD',
        name_plural: 'Hong Kong dollars'
    },
    HNL: {
        symbol: 'HNL',
        name: 'Honduran Lempira',
        symbol_native: 'L',
        decimal_digits: 2,
        rounding: 0,
        code: 'HNL',
        name_plural: 'Honduran lempiras'
    },
    HRK: {
        symbol: 'kn',
        name: 'Croatian Kuna',
        symbol_native: 'kn',
        decimal_digits: 2,
        rounding: 0,
        code: 'HRK',
        name_plural: 'Croatian kunas'
    },
    HUF: {
        symbol: 'Ft',
        name: 'Hungarian Forint',
        symbol_native: 'Ft',
        decimal_digits: 0,
        rounding: 0,
        code: 'HUF',
        name_plural: 'Hungarian forints'
    },
    IDR: {
        symbol: 'Rp',
        name: 'Indonesian Rupiah',
        symbol_native: 'Rp',
        decimal_digits: 0,
        rounding: 0,
        code: 'IDR',
        name_plural: 'Indonesian rupiahs'
    },
    ILS: {
        symbol: '₪',
        name: 'Israeli New Sheqel',
        symbol_native: '₪',
        decimal_digits: 2,
        rounding: 0,
        code: 'ILS',
        name_plural: 'Israeli new sheqels'
    },
    INR: {
        symbol: 'Rs',
        name: 'Indian Rupee',
        symbol_native: 'টকা',
        decimal_digits: 2,
        rounding: 0,
        code: 'INR',
        name_plural: 'Indian rupees'
    },
    IQD: {
        symbol: 'IQD',
        name: 'Iraqi Dinar',
        symbol_native: 'د.ع.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'IQD',
        name_plural: 'Iraqi dinars'
    },
    IRR: {
        symbol: 'IRR',
        name: 'Iranian Rial',
        symbol_native: '﷼',
        decimal_digits: 0,
        rounding: 0,
        code: 'IRR',
        name_plural: 'Iranian rials'
    },
    ISK: {
        symbol: 'Ikr',
        name: 'Icelandic Króna',
        symbol_native: 'kr',
        decimal_digits: 0,
        rounding: 0,
        code: 'ISK',
        name_plural: 'Icelandic krónur'
    },
    JMD: {
        symbol: 'J$',
        name: 'Jamaican Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'JMD',
        name_plural: 'Jamaican dollars'
    },
    JOD: {
        symbol: 'JD',
        name: 'Jordanian Dinar',
        symbol_native: 'د.أ.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'JOD',
        name_plural: 'Jordanian dinars'
    },
    JPY: {
        symbol: '¥',
        name: 'Japanese Yen',
        symbol_native: '￥',
        decimal_digits: 0,
        rounding: 0,
        code: 'JPY',
        name_plural: 'Japanese yen'
    },
    KES: {
        symbol: 'Ksh',
        name: 'Kenyan Shilling',
        symbol_native: 'Ksh',
        decimal_digits: 2,
        rounding: 0,
        code: 'KES',
        name_plural: 'Kenyan shillings'
    },
    KHR: {
        symbol: 'KHR',
        name: 'Cambodian Riel',
        symbol_native: '៛',
        decimal_digits: 2,
        rounding: 0,
        code: 'KHR',
        name_plural: 'Cambodian riels'
    },
    KMF: {
        symbol: 'CF',
        name: 'Comorian Franc',
        symbol_native: 'FC',
        decimal_digits: 0,
        rounding: 0,
        code: 'KMF',
        name_plural: 'Comorian francs'
    },
    KRW: {
        symbol: '₩',
        name: 'South Korean Won',
        symbol_native: '₩',
        decimal_digits: 0,
        rounding: 0,
        code: 'KRW',
        name_plural: 'South Korean won'
    },
    KWD: {
        symbol: 'KD',
        name: 'Kuwaiti Dinar',
        symbol_native: 'د.ك.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'KWD',
        name_plural: 'Kuwaiti dinars'
    },
    KZT: {
        symbol: 'KZT',
        name: 'Kazakhstani Tenge',
        symbol_native: 'тңг.',
        decimal_digits: 2,
        rounding: 0,
        code: 'KZT',
        name_plural: 'Kazakhstani tenges'
    },
    LBP: {
        symbol: 'L.L.',
        name: 'Lebanese Pound',
        symbol_native: 'ل.ل.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'LBP',
        name_plural: 'Lebanese pounds'
    },
    LKR: {
        symbol: 'SLRs',
        name: 'Sri Lankan Rupee',
        symbol_native: 'SL Re',
        decimal_digits: 2,
        rounding: 0,
        code: 'LKR',
        name_plural: 'Sri Lankan rupees'
    },
    LTL: {
        symbol: 'Lt',
        name: 'Lithuanian Litas',
        symbol_native: 'Lt',
        decimal_digits: 2,
        rounding: 0,
        code: 'LTL',
        name_plural: 'Lithuanian litai'
    },
    LVL: {
        symbol: 'Ls',
        name: 'Latvian Lats',
        symbol_native: 'Ls',
        decimal_digits: 2,
        rounding: 0,
        code: 'LVL',
        name_plural: 'Latvian lati'
    },
    LYD: {
        symbol: 'LD',
        name: 'Libyan Dinar',
        symbol_native: 'د.ل.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'LYD',
        name_plural: 'Libyan dinars'
    },
    MAD: {
        symbol: 'MAD',
        name: 'Moroccan Dirham',
        symbol_native: 'د.م.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'MAD',
        name_plural: 'Moroccan dirhams'
    },
    MDL: {
        symbol: 'MDL',
        name: 'Moldovan Leu',
        symbol_native: 'MDL',
        decimal_digits: 2,
        rounding: 0,
        code: 'MDL',
        name_plural: 'Moldovan lei'
    },
    MGA: {
        symbol: 'MGA',
        name: 'Malagasy Ariary',
        symbol_native: 'MGA',
        decimal_digits: 0,
        rounding: 0,
        code: 'MGA',
        name_plural: 'Malagasy Ariaries'
    },
    MKD: {
        symbol: 'MKD',
        name: 'Macedonian Denar',
        symbol_native: 'MKD',
        decimal_digits: 2,
        rounding: 0,
        code: 'MKD',
        name_plural: 'Macedonian denari'
    },
    MMK: {
        symbol: 'MMK',
        name: 'Myanma Kyat',
        symbol_native: 'K',
        decimal_digits: 0,
        rounding: 0,
        code: 'MMK',
        name_plural: 'Myanma kyats'
    },
    MOP: {
        symbol: 'MOP$',
        name: 'Macanese Pataca',
        symbol_native: 'MOP$',
        decimal_digits: 2,
        rounding: 0,
        code: 'MOP',
        name_plural: 'Macanese patacas'
    },
    MUR: {
        symbol: 'MURs',
        name: 'Mauritian Rupee',
        symbol_native: 'MURs',
        decimal_digits: 0,
        rounding: 0,
        code: 'MUR',
        name_plural: 'Mauritian rupees'
    },
    MXN: {
        symbol: 'MX$',
        name: 'Mexican Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'MXN',
        name_plural: 'Mexican pesos'
    },
    MYR: {
        symbol: 'RM',
        name: 'Malaysian Ringgit',
        symbol_native: 'RM',
        decimal_digits: 2,
        rounding: 0,
        code: 'MYR',
        name_plural: 'Malaysian ringgits'
    },
    MZN: {
        symbol: 'MTn',
        name: 'Mozambican Metical',
        symbol_native: 'MTn',
        decimal_digits: 2,
        rounding: 0,
        code: 'MZN',
        name_plural: 'Mozambican meticals'
    },
    NAD: {
        symbol: 'N$',
        name: 'Namibian Dollar',
        symbol_native: 'N$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NAD',
        name_plural: 'Namibian dollars'
    },
    NGN: {
        symbol: '₦',
        name: 'Nigerian Naira',
        symbol_native: '₦',
        decimal_digits: 2,
        rounding: 0,
        code: 'NGN',
        name_plural: 'Nigerian nairas'
    },
    NIO: {
        symbol: 'C$',
        name: 'Nicaraguan Córdoba',
        symbol_native: 'C$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NIO',
        name_plural: 'Nicaraguan córdobas'
    },
    NOK: {
        symbol: 'Nkr',
        name: 'Norwegian Krone',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'NOK',
        name_plural: 'Norwegian kroner'
    },
    NPR: {
        symbol: 'NPRs',
        name: 'Nepalese Rupee',
        symbol_native: 'नेरू',
        decimal_digits: 2,
        rounding: 0,
        code: 'NPR',
        name_plural: 'Nepalese rupees'
    },
    NZD: {
        symbol: 'NZ$',
        name: 'New Zealand Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NZD',
        name_plural: 'New Zealand dollars'
    },
    OMR: {
        symbol: 'OMR',
        name: 'Omani Rial',
        symbol_native: 'ر.ع.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'OMR',
        name_plural: 'Omani rials'
    },
    PAB: {
        symbol: 'B/.',
        name: 'Panamanian Balboa',
        symbol_native: 'B/.',
        decimal_digits: 2,
        rounding: 0,
        code: 'PAB',
        name_plural: 'Panamanian balboas'
    },
    PEN: {
        symbol: 'S/.',
        name: 'Peruvian Nuevo Sol',
        symbol_native: 'S/.',
        decimal_digits: 2,
        rounding: 0,
        code: 'PEN',
        name_plural: 'Peruvian nuevos soles'
    },
    PHP: {
        symbol: '₱',
        name: 'Philippine Peso',
        symbol_native: '₱',
        decimal_digits: 2,
        rounding: 0,
        code: 'PHP',
        name_plural: 'Philippine pesos'
    },
    PKR: {
        symbol: 'PKRs',
        name: 'Pakistani Rupee',
        symbol_native: '₨',
        decimal_digits: 0,
        rounding: 0,
        code: 'PKR',
        name_plural: 'Pakistani rupees'
    },
    PLN: {
        symbol: 'zł',
        name: 'Polish Zloty',
        symbol_native: 'zł',
        decimal_digits: 2,
        rounding: 0,
        code: 'PLN',
        name_plural: 'Polish zlotys'
    },
    PYG: {
        symbol: '₲',
        name: 'Paraguayan Guarani',
        symbol_native: '₲',
        decimal_digits: 0,
        rounding: 0,
        code: 'PYG',
        name_plural: 'Paraguayan guaranis'
    },
    QAR: {
        symbol: 'QR',
        name: 'Qatari Rial',
        symbol_native: 'ر.ق.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'QAR',
        name_plural: 'Qatari rials'
    },
    RON: {
        symbol: 'RON',
        name: 'Romanian Leu',
        symbol_native: 'RON',
        decimal_digits: 2,
        rounding: 0,
        code: 'RON',
        name_plural: 'Romanian lei'
    },
    RSD: {
        symbol: 'din.',
        name: 'Serbian Dinar',
        symbol_native: 'дин.',
        decimal_digits: 0,
        rounding: 0,
        code: 'RSD',
        name_plural: 'Serbian dinars'
    },
    RUB: {
        symbol: 'RUB',
        name: 'Russian Ruble',
        symbol_native: '₽.',
        decimal_digits: 2,
        rounding: 0,
        code: 'RUB',
        name_plural: 'Russian rubles'
    },
    RWF: {
        symbol: 'RWF',
        name: 'Rwandan Franc',
        symbol_native: 'FR',
        decimal_digits: 0,
        rounding: 0,
        code: 'RWF',
        name_plural: 'Rwandan francs'
    },
    SAR: {
        symbol: 'SR',
        name: 'Saudi Riyal',
        symbol_native: 'ر.س.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'SAR',
        name_plural: 'Saudi riyals'
    },
    SDG: {
        symbol: 'SDG',
        name: 'Sudanese Pound',
        symbol_native: 'SDG',
        decimal_digits: 2,
        rounding: 0,
        code: 'SDG',
        name_plural: 'Sudanese pounds'
    },
    SEK: {
        symbol: 'Skr',
        name: 'Swedish Krona',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'SEK',
        name_plural: 'Swedish kronor'
    },
    SGD: {
        symbol: 'S$',
        name: 'Singapore Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'SGD',
        name_plural: 'Singapore dollars'
    },
    SOS: {
        symbol: 'Ssh',
        name: 'Somali Shilling',
        symbol_native: 'Ssh',
        decimal_digits: 0,
        rounding: 0,
        code: 'SOS',
        name_plural: 'Somali shillings'
    },
    SYP: {
        symbol: 'SY£',
        name: 'Syrian Pound',
        symbol_native: 'ل.س.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'SYP',
        name_plural: 'Syrian pounds'
    },
    THB: {
        symbol: '฿',
        name: 'Thai Baht',
        symbol_native: '฿',
        decimal_digits: 2,
        rounding: 0,
        code: 'THB',
        name_plural: 'Thai baht'
    },
    TND: {
        symbol: 'DT',
        name: 'Tunisian Dinar',
        symbol_native: 'د.ت.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'TND',
        name_plural: 'Tunisian dinars'
    },
    TOP: {
        symbol: 'T$',
        name: 'Tongan Paʻanga',
        symbol_native: 'T$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TOP',
        name_plural: 'Tongan paʻanga'
    },
    TRY: {
        symbol: 'TL',
        name: 'Turkish Lira',
        symbol_native: 'TL',
        decimal_digits: 2,
        rounding: 0,
        code: 'TRY',
        name_plural: 'Turkish Lira'
    },
    TTD: {
        symbol: 'TT$',
        name: 'Trinidad and Tobago Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TTD',
        name_plural: 'Trinidad and Tobago dollars'
    },
    TWD: {
        symbol: 'NT$',
        name: 'New Taiwan Dollar',
        symbol_native: 'NT$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TWD',
        name_plural: 'New Taiwan dollars'
    },
    TZS: {
        symbol: 'TSh',
        name: 'Tanzanian Shilling',
        symbol_native: 'TSh',
        decimal_digits: 0,
        rounding: 0,
        code: 'TZS',
        name_plural: 'Tanzanian shillings'
    },
    UAH: {
        symbol: '₴',
        name: 'Ukrainian Hryvnia',
        symbol_native: '₴',
        decimal_digits: 2,
        rounding: 0,
        code: 'UAH',
        name_plural: 'Ukrainian hryvnias'
    },
    UGX: {
        symbol: 'USh',
        name: 'Ugandan Shilling',
        symbol_native: 'USh',
        decimal_digits: 0,
        rounding: 0,
        code: 'UGX',
        name_plural: 'Ugandan shillings'
    },
    UYU: {
        symbol: '$U',
        name: 'Uruguayan Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'UYU',
        name_plural: 'Uruguayan pesos'
    },
    UZS: {
        symbol: 'UZS',
        name: 'Uzbekistan Som',
        symbol_native: 'UZS',
        decimal_digits: 0,
        rounding: 0,
        code: 'UZS',
        name_plural: 'Uzbekistan som'
    },
    VEF: {
        symbol: 'Bs.F.',
        name: 'Venezuelan Bolívar',
        symbol_native: 'Bs.F.',
        decimal_digits: 2,
        rounding: 0,
        code: 'VEF',
        name_plural: 'Venezuelan bolívars'
    },
    VND: {
        symbol: '₫',
        name: 'Vietnamese Dong',
        symbol_native: '₫',
        decimal_digits: 0,
        rounding: 0,
        code: 'VND',
        name_plural: 'Vietnamese dong'
    },
    XAF: {
        symbol: 'FCFA',
        name: 'CFA Franc BEAC',
        symbol_native: 'FCFA',
        decimal_digits: 0,
        rounding: 0,
        code: 'XAF',
        name_plural: 'CFA francs BEAC'
    },
    XOF: {
        symbol: 'CFA',
        name: 'CFA Franc BCEAO',
        symbol_native: 'CFA',
        decimal_digits: 0,
        rounding: 0,
        code: 'XOF',
        name_plural: 'CFA francs BCEAO'
    },
    YER: {
        symbol: 'YR',
        name: 'Yemeni Rial',
        symbol_native: 'ر.ي.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'YER',
        name_plural: 'Yemeni rials'
    },
    ZAR: {
        symbol: 'R',
        name: 'South African Rand',
        symbol_native: 'R',
        decimal_digits: 2,
        rounding: 0,
        code: 'ZAR',
        name_plural: 'South African rand'
    },
    ZMK: {
        symbol: 'ZK',
        name: 'Zambian Kwacha',
        symbol_native: 'ZK',
        decimal_digits: 0,
        rounding: 0,
        code: 'ZMK',
        name_plural: 'Zambian kwachas'
    },
    ZWL: {
        symbol: 'ZWL$',
        name: 'Zimbabwean Dollar',
        symbol_native: 'ZWL$',
        decimal_digits: 0,
        rounding: 0,
        code: 'ZWL',
        name_plural: 'Zimbabwean Dollar'
    }
}).map((c) => c[1]);

export default function CompanySection() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);

    const [isCompanySelectOpen, setIsCompanySelectOpen] = useState(false);

    // const [currentCompany, setCurrentCompany] = useState(null)
    const currentCompany = useSelector((state) => state.custom.currentCompany);
    const setCurrentCompany = (company) => dispatch(setCurrentReduxCompany(company));

    const [addCompanyDialog, setAddCompanyDialog] = useState(false);
    const [editCompanyDialog, setEditCompanyDialog] = useState(false);

    const [isGSTRegistered, setIsGSTRegistered] = useState(false);
    const [registrationType, setRegistrationType] = useState('regular');
    const [isEWayBillApplicable, setIsEWayBillApplicable] = useState(false);
    const [isEInvoicingApplicable, setIsEInvoicingApplicable] = useState(false);
    const formRef = useRef();

    // const [defaultState, setDefaultState] = useState('')

    const fetchAllCompanies = () => {
        axiosInstance.get('/company/company/').then((response) => {
            if (response.data.length == 0) {
                setAddCompanyDialog(true);
                setEditCompanyDialog(false);
            }
            if (!currentCompany && response.data.length > 0) {
                setCurrentCompany(response.data[0]);
            }
            setCompanies(response.data);
        });
    };
    useEffect(() => {
        fetchAllCompanies();
    }, []);

    const currentDate = new Date();
    const year = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            address: '',
            city: '',
            pincode: '',
            mobile: '',
            email: '',
            website: '',
            base_currency: '',
            country: '',
            // country: 4,
            // country: countries.find(country => country.name == 'India')?.id || '',
            state: '',
            // state: 142,
            // state: states.find(state => state.name == 'Gujarat')?.id || '',
            financial_year_beginning: `${year}-04-01`,
            registration_status: false,
            registration_type: 'regular',
            assessee_of_other_territory: false,
            gstin_uin: '',
            periodicity: 'monthly',
            e_way_bill_applicable: false,
            e_way_bill_applicable_from: `${year}-04-01`,
            e_way_bill_applicable_for_intrastate: '',
            pan_number: '',
            cin_number: '',
            e_invoicing_applicable: false,
            e_invoicing_applicable_from: `${year}-04-01`,
            invoice_bill_from_place: '',
            tax_rate: '',
            tax_calculation_type: '',
            bank_name: '',
            account_holder_name: '',
            account_number: '',
            bank_ifsc: '',
            bank_swift: '',
            bank_branch: '',
            bank_address: '',
            bank_gst: '',
            bank_opening_balance: '0',
            bank_balance_type: 'CR',
            print_in_invoice: false
        },
        onSubmit: async (values, { setErrors }) => {
            const request_data = values;
            try {
                if (addCompanyDialog) await axiosInstance.post(`/company/company/`, request_data);
                if (editCompanyDialog) await axiosInstance.patch(`/company/company/${request_data.id}/`, request_data);

                fetchAllCompanies();
                alert(`Company ${editCompanyDialog ? 'edited' : 'created'} successfully`);
                setAddCompanyDialog(false);
                setEditCompanyDialog(false);
                formik.resetForm();
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data;
                    const errors = {};

                    let message = '';
                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                        message += `${field}: ${errors[field]} \n`;
                    });
                    alert(message);
                    setErrors(errors);
                    // alert('Please check all sections of company creation')
                }
            }
        }
        // enableReinitialize: true
    });

    // const addCompanyForm = {
    //     formik: formik,
    //     title: 'Add Company',
    //     sections: [
    //         [
    //             {
    //                 id: 'name',
    //                 type: 'text',
    //                 label: 'Company Name',
    //                 params: {
    //                     autoFocus: true,
    //                     required: true,
    //                 }
    //             },
    //             {
    //                 id: 'pincode',
    //                 type: 'text',
    //                 label: 'Pincode',
    //                 params: {
    //                     inputProps: {
    //                         pattern: '[0-9]{6}',
    //                         title: 'Please enter a valid 6-digit postal code',
    //                         required: true,
    //                     }
    //                 }
    //             },
    //             {
    //                 id: 'mobile',
    //                 type: 'text',
    //                 label: 'Mobile',
    //                 params: {
    //                     inputProps: {
    //                         required: true,
    //                     },
    //                 }
    //             },
    //             {
    //                 id: 'email',
    //                 type: 'email',
    //                 label: 'Email',
    //             },
    //             {
    //                 id: 'website',
    //                 type: 'text',
    //                 label: 'Website',
    //             },
    //             {
    //                 id: 'base_currency_symbol',
    //                 type: 'text',
    //                 label: 'Base Currency Symbol',
    //                 params: {
    //                     inputProps: {
    //                         required: true,
    //                     },
    //                 },
    //             },
    //             {
    //                 id: 'base_currency_name',
    //                 type: 'text',
    //                 label: 'Base Currency Name',
    //                 params: {
    //                     inputProps: {
    //                         required: true,
    //                     },
    //                 },
    //             },
    //             {
    //                 id: 'country',
    //                 type: 'select',
    //                 label: 'Country',
    //                 options: countries,
    //                 params: {
    //                     inputProps: {
    //                         required: true,
    //                         onChange: (e) => {
    //                             const countryId = e.target.value
    //                             console.log('Country Id:', countryId)
    //                             axiosInstance.get(`/company/country/${countryId}/`).then((response) => {
    //                                 setStates(response.data.states)
    //                             })
    //                         }
    //                     }
    //                 }
    //             },
    //             {
    //                 id: 'state',
    //                 type: 'select',
    //                 label: 'State',
    //                 options: states,
    //                 params: {
    //                     inputProps: {
    //                         required: true,
    //                     },
    //                 }
    //             },
    //             {
    //                 id: 'address',
    //                 type: 'text',
    //                 label: 'Address',
    //                 md: 12,
    //                 params: {
    //                     multiline: true,
    //                     rows: 3,
    //                 }
    //             },
    //         ],
    //         []
    //     ]
    // }

    // const addCompanyForm = {
    //     formik: formik,
    //     fields: [
    //         {
    //             id: 'name',
    //             type: 'text',
    //             label: 'Company Name',
    //             params: {
    //                 autoFocus: true
    //             }
    //         },
    //         {
    //             id: 'pincode',
    //             type: 'text',
    //             label: 'Pincode',
    //             params: {
    //                 inputProps: {
    //                     pattern: '[0-9]{6}'
    //                 }
    //             }
    //         },
    //         {
    //             id: 'mobile',
    //             type: 'text',
    //             label: 'Mobile',
    //         },
    //         {
    //             id: 'email',
    //             type: 'email',
    //             label: 'Email',
    //         },
    //         {
    //             id: 'website',
    //             type: 'text',
    //             label: 'Website',
    //         },
    //         {
    //             id: 'base_currency',
    //             type: 'text',
    //             label: 'Base Currency',
    //         },
    //         {
    //             id: 'country',
    //             type: 'select',
    //             label: 'Country',
    //             options: countries,
    //             params: {
    //                 inputProps: {
    //                     onChange: (e) => {
    //                         const countryId = e.target.value
    //                         console.log('Country Id:', countryId)
    //                         axiosInstance.get(`/company/country/${countryId}/`).then((response) => {
    //                             setStates(response.data.states)
    //                         })
    //                     }
    //                 }
    //             }
    //         },
    //         {
    //             id: 'state',
    //             type: 'select',
    //             label: 'State',
    //             options: states
    //         },
    //         {
    //             id: 'address',
    //             type: 'text',
    //             label: 'Address',
    //             md: 12,
    //             params: {
    //                 multiline: true,
    //                 rows: 3,
    //             }
    //         },
    //     ]
    // }

    localStorage.setItem('current_company', JSON.stringify(currentCompany));
    currentCompany && localStorage.setItem('current_company_id', currentCompany.id);

    const [currentSection, setCurrentSection] = useState(0);
    const sections = [
        [
            // Name
            <Grid key={'0-0'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.name && formik.errors.name)}>
                    <InputLabel htmlFor={'outlined-label-name'}>Company Name</InputLabel>
                    <OutlinedInput
                        id={'outlined-name'}
                        type={'text'}
                        value={formik.values.name}
                        name={'name'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Company Name'}
                        autoFocus={true}
                        required={true}
                        inputProps={{
                            onChange: (e) => {
                                formik.setFieldValue('account_holder_name', e.target.value);
                            }
                        }}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <FormHelperText error id={'standard-weight-helper-text-name'}>
                            {formik.errors.name}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Mobile
            <Grid key={'0-2'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.mobile && formik.errors.mobile)}>
                    <InputLabel htmlFor={'outlined-label-mobile'}>Mobile</InputLabel>
                    <OutlinedInput
                        id={'outlined-mobile'}
                        type={'text'}
                        value={formik.values.mobile}
                        name={'mobile'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Mobile'}
                        inputProps={{ required: true }}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                        <FormHelperText error id={'standard-weight-helper-text-mobile'}>
                            {formik.errors.mobile}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Email
            <Grid key={'0-3'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)}>
                    <InputLabel htmlFor={'outlined-label-email'}>Email</InputLabel>
                    <OutlinedInput
                        id={'outlined-email'}
                        type={'email'}
                        value={formik.values.email}
                        name={'email'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Email'}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <FormHelperText error id={'standard-weight-helper-text-email'}>
                            {formik.errors.email}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Website
            <Grid key={'0-4'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.website && formik.errors.website)}>
                    <InputLabel htmlFor={'outlined-label-website'}>Website</InputLabel>
                    <OutlinedInput
                        id={'outlined-website'}
                        type={'text'}
                        value={formik.values.website}
                        name={'website'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Website'}
                    />
                    {formik.touched.website && formik.errors.website && (
                        <FormHelperText error id={'standard-weight-helper-text-website'}>
                            {formik.errors.website}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Address
            <Address key={'0-5'} item formik={formik} displayCountries={true} md={4} />,

            // Base Currency
            <Grid key={'0-6'} item md={4}>
                <Autocomplete
                    options={currency}
                    getOptionLabel={(option) => `${option.symbol} - ${option.name} - ${option.code}`}
                    renderInput={(params) => <TextField label="Base Currency" variant="outlined" {...params} required />}
                    value={currency.find((c) => c.code == formik.values.base_currency) || null}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('base_currency', newValue ? newValue.code : '');
                    }}
                />
                {/* <FormControl fullWidth error={Boolean(formik.touched.base_currency && formik.errors.base_currency)}>
                    <InputLabel htmlFor={'outlined-label-base_currency'}>Base Currency</InputLabel>
                    <OutlinedInput
                        id={'outlined-base_currency'}
                        type={'text'}
                        value={formik.values.base_currency}
                        name={'base_currency'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Base Currency Symbol'}
                        inputProps={{ "required": true }}
                    />
                    {
                        formik.touched.base_currency && formik.errors.base_currency && (
                            <FormHelperText error id={'standard-weight-helper-text-base_currency'}>
                                {formik.errors.base_currency}
                            </FormHelperText>
                        )
                    }
                </FormControl> */}
            </Grid>,

            // Financial Year Beginning
            <Grid key={'0-9'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.financial_year_beginning && formik.errors.financial_year_beginning)}>
                    <InputLabel htmlFor={'outlined-label-financial_year_beginning'}>Financial Year Beginning</InputLabel>
                    <OutlinedInput
                        id={'outlined-financial_year_beginning'}
                        type={'date'}
                        value={formik.values.financial_year_beginning}
                        name={'financial_year_beginning'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Financial Year Beginning'}
                        required={true}
                    />
                    {formik.touched.financial_year_beginning && formik.errors.financial_year_beginning && (
                        <FormHelperText error id={'standard-weight-helper-text-financial_year_beginning'}>
                            {formik.errors.financial_year_beginning}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        ],
        [
            // GST Details Title
            <Grid key={'1-title-0'} item md={12} container justifyContent="center" alignItems="center">
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>GST Details</span>
            </Grid>,

            // GST Registered
            <Grid key={'1-0'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.registration_status && formik.errors.registration_status)}>
                    <InputLabel htmlFor={'outlined-label-registration_status'}>GST Registered?</InputLabel>
                    <Select
                        labelId={'outlined-label-registration_status'}
                        id={'outlined-registration_status'}
                        value={formik.values.registration_status}
                        name={'registration_status'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'GST Registered?'}
                        autoFocus={true}
                        required={true}
                        inputProps={{
                            onChange: (e) => {
                                setIsGSTRegistered(e.target.value);
                            }
                        }}
                    >
                        {[
                            {
                                id: true,
                                name: 'Yes'
                            },
                            {
                                id: false,
                                name: 'No'
                            }
                        ].map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.registration_status && formik.errors.registration_status && (
                        <FormHelperText error id={'standard-weight-helper-text-registration_status'}>
                            {formik.errors.registration_status}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Registration Type
            isGSTRegistered && (
                <Grid key={'1-1'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.registration_type && formik.errors.registration_type)}>
                        <InputLabel htmlFor={'outlined-label-registration_type'}>Registration Type</InputLabel>
                        <Select
                            labelId={'outlined-label-registration_type'}
                            id={'outlined-registration_type'}
                            value={formik.values.registration_type}
                            name={'registration_type'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Registration Type'}
                            required={true}
                            inputProps={{
                                onChange: (e) => {
                                    setRegistrationType(e.target.value);
                                }
                            }}
                        >
                            {[
                                {
                                    id: 'regular',
                                    name: 'Regular'
                                },
                                {
                                    id: 'composition',
                                    name: 'Composition'
                                },
                                {
                                    id: 'unregistered',
                                    name: 'Unregistered'
                                },
                                {
                                    id: 'RCM',
                                    name: 'RCM'
                                },
                                {
                                    id: 'SEZ',
                                    name: 'SEZ'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.registration_type && formik.errors.registration_type && (
                            <FormHelperText error id={'standard-weight-helper-text-registration_type'}>
                                {formik.errors.registration_type}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // Assessee of Other Territory
            isGSTRegistered && (
                <Grid key={'1-2'} item md={4}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.assessee_of_other_territory && formik.errors.assessee_of_other_territory)}
                    >
                        <InputLabel htmlFor={'outlined-label-assessee_of_other_territory'}>Assessee of Other Territory</InputLabel>
                        <Select
                            labelId={'outlined-label-assessee_of_other_territory'}
                            id={'outlined-assessee_of_other_territory'}
                            value={formik.values.assessee_of_other_territory}
                            name={'assessee_of_other_territory'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Assessee of Other Territory'}
                            required={true}
                        >
                            {[
                                {
                                    id: true,
                                    name: 'Yes'
                                },
                                {
                                    id: false,
                                    name: 'No'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.assessee_of_other_territory && formik.errors.assessee_of_other_territory && (
                            <FormHelperText error id={'standard-weight-helper-text-assessee_of_other_territory'}>
                                {formik.errors.assessee_of_other_territory}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // GSTIn/UIN
            isGSTRegistered && (
                <Grid key={'1-3'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.gstin_uin && formik.errors.gstin_uin)}>
                        <InputLabel htmlFor={'outlined-label-gstin_uin'}>GSTIN/UIN</InputLabel>
                        <OutlinedInput
                            id={'outlined-gstin_uin'}
                            type={'text'}
                            value={formik.values.gstin_uin}
                            name={'gstin_uin'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'GSTIN/UIN'}
                            required={true}
                            inputProps={{
                                pattern: '.{15}',
                                title: 'GSTIN/UIN should be 15 characters.',
                                onChange: (e) => {
                                    const gstNumber = e.target.value;
                                    formik.setFieldValue('pan_number', gstNumber.slice(2, -3));
                                }
                            }}
                        />
                        {formik.touched.gstin_uin && formik.errors.gstin_uin && (
                            <FormHelperText error id={'standard-weight-helper-text-gstin_uin'}>
                                {formik.errors.gstin_uin}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // Periodicity
            isGSTRegistered && (
                <Grid key={'1-4'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.periodicity && formik.errors.periodicity)}>
                        <InputLabel htmlFor={'outlined-label-periodicity'}>Periodicity</InputLabel>
                        <Select
                            labelId={'outlined-label-periodicity'}
                            id={'outlined-periodicity'}
                            value={formik.values.periodicity}
                            name={'periodicity'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Periodicity'}
                            required={true}
                        >
                            {[
                                {
                                    id: 'monthly',
                                    name: 'Monthly'
                                },
                                {
                                    id: 'quarterly',
                                    name: 'Quarterly'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.periodicity && formik.errors.periodicity && (
                            <FormHelperText error id={'standard-weight-helper-text-periodicity'}>
                                {formik.errors.periodicity}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // PAN Number
            isGSTRegistered && (
                <Grid key={'1-8'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.pan_number && formik.errors.pan_number)}>
                        <InputLabel htmlFor={'outlined-label-pan_number'}>PAN Number</InputLabel>
                        <OutlinedInput
                            id={'outlined-pan_number'}
                            type={'text'}
                            value={formik.values.pan_number}
                            name={'pan_number'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'PAN Number'}
                            required={true}
                            inputProps={{
                                pattern: '.{10}',
                                title: 'PAN number should be 10 characters.'
                            }}
                        />
                        {formik.touched.pan_number && formik.errors.pan_number && (
                            <FormHelperText error id={'standard-weight-helper-text-pan_number'}>
                                {formik.errors.pan_number}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // E-Way Bill Details Title
            isGSTRegistered && (
                <Grid key={'1-title-1'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Way Bill Details</span>
                </Grid>
            ),

            // e-Way Bill Applicable
            isGSTRegistered && (
                <Grid key={'1-5'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.e_way_bill_applicable && formik.errors.e_way_bill_applicable)}>
                        <InputLabel htmlFor={'outlined-label-e_way_bill_applicable'}>e-Way Bill Applicable</InputLabel>
                        <Select
                            labelId={'outlined-label-e_way_bill_applicable'}
                            id={'outlined-e_way_bill_applicable'}
                            value={formik.values.e_way_bill_applicable}
                            name={'e_way_bill_applicable'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'e-Way Bill Applicable'}
                            required={true}
                            inputProps={{
                                onChange: (e) => {
                                    setIsEWayBillApplicable(e.target.value);
                                }
                            }}
                        >
                            {[
                                {
                                    id: true,
                                    name: 'Yes'
                                },
                                {
                                    id: false,
                                    name: 'No'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.e_way_bill_applicable && formik.errors.e_way_bill_applicable && (
                            <FormHelperText error id={'standard-weight-helper-text-e_way_bill_applicable'}>
                                {formik.errors.e_way_bill_applicable}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // e-Way Bill Applicable From
            isGSTRegistered && isEWayBillApplicable && (
                <Grid key={'1-6'} item md={4}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.e_way_bill_applicable_from && formik.errors.e_way_bill_applicable_from)}
                    >
                        <InputLabel htmlFor={'outlined-label-e_way_bill_applicable_from'}>e-Way Bill Applicable From</InputLabel>
                        <OutlinedInput
                            id={'outlined-e_way_bill_applicable_from'}
                            type={'date'}
                            value={formik.values.e_way_bill_applicable_from}
                            name={'e_way_bill_applicable_from'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'e-Way Bill Applicable From'}
                            required={true}
                        />
                        {formik.touched.e_way_bill_applicable_from && formik.errors.e_way_bill_applicable_from && (
                            <FormHelperText error id={'standard-weight-helper-text-e_way_bill_applicable_from'}>
                                {formik.errors.e_way_bill_applicable_from}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // e-Way Bill Applicable for Intrastate
            isGSTRegistered && isEWayBillApplicable && (
                <Grid key={'1-7'} item md={4}>
                    <FormControl
                        fullWidth
                        error={Boolean(
                            formik.touched.e_way_bill_applicable_for_intrastate && formik.errors.e_way_bill_applicable_for_intrastate
                        )}
                    >
                        <InputLabel htmlFor={'outlined-label-e_way_bill_applicable_for_intrastate'}>
                            e-Way Bill Applicable for Intrastate
                        </InputLabel>
                        <Select
                            labelId={'outlined-label-e_way_bill_applicable_for_intrastate'}
                            id={'outlined-e_way_bill_applicable_for_intrastate'}
                            value={formik.values.e_way_bill_applicable_for_intrastate}
                            name={'e_way_bill_applicable_for_intrastate'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'e-Way Bill Applicable for Intrastate'}
                            required={true}
                        >
                            {[
                                {
                                    id: true,
                                    name: 'Yes'
                                },
                                {
                                    id: false,
                                    name: 'No'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.e_way_bill_applicable_for_intrastate && formik.errors.e_way_bill_applicable_for_intrastate && (
                            <FormHelperText error id={'standard-weight-helper-text-e_way_bill_applicable_for_intrastate'}>
                                {formik.errors.e_way_bill_applicable_for_intrastate}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // E-Invoice Details Title
            isGSTRegistered && registrationType == 'regular' && (
                <Grid key={'1-title-2'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Invoice Details</span>
                </Grid>
            ),

            // e-Invoicing Applicable
            isGSTRegistered && registrationType == 'regular' && (
                <Grid key={'1-10'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.e_invoicing_applicable && formik.errors.e_invoicing_applicable)}>
                        <InputLabel htmlFor={'outlined-label-e_invoicing_applicable'}>e-Invoicing Applicable</InputLabel>
                        <Select
                            labelId={'outlined-label-e_invoicing_applicable'}
                            id={'outlined-e_invoicing_applicable'}
                            value={formik.values.e_invoicing_applicable}
                            name={'e_invoicing_applicable'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'e-Invoicing Applicable'}
                            required={true}
                            inputProps={{
                                onChange: (e) => {
                                    setIsEInvoicingApplicable(e.target.value);
                                }
                            }}
                        >
                            {[
                                {
                                    id: true,
                                    name: 'Yes'
                                },
                                {
                                    id: false,
                                    name: 'No'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.e_invoicing_applicable && formik.errors.e_invoicing_applicable && (
                            <FormHelperText error id={'standard-weight-helper-text-e_invoicing_applicable'}>
                                {formik.errors.e_invoicing_applicable}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // e-Invoicing Applicable From
            isGSTRegistered && registrationType == 'regular' && isEInvoicingApplicable && (
                <Grid key={'1-11'} item md={4}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.e_invoicing_applicable_from && formik.errors.e_invoicing_applicable_from)}
                    >
                        <InputLabel htmlFor={'outlined-label-e_invoicing_applicable_from'}>e-Invoicing Applicable From</InputLabel>
                        <OutlinedInput
                            id={'outlined-e_invoicing_applicable_from'}
                            type={'date'}
                            value={formik.values.e_invoicing_applicable_from}
                            name={'e_invoicing_applicable_from'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'e-Invoicing Applicable From'}
                            required={true}
                        />
                        {formik.touched.e_invoicing_applicable_from && formik.errors.e_invoicing_applicable_from && (
                            <FormHelperText error id={'standard-weight-helper-text-e_invoicing_applicable_from'}>
                                {formik.errors.e_invoicing_applicable_from}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // Invoice Bill From Place
            isGSTRegistered && registrationType == 'regular' && isEInvoicingApplicable && (
                <Grid key={'1-12'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.invoice_bill_from_place && formik.errors.invoice_bill_from_place)}>
                        <InputLabel htmlFor={'outlined-label-invoice_bill_from_place'}>Invoice Bill From Place</InputLabel>
                        <OutlinedInput
                            id={'outlined-invoice_bill_from_place'}
                            type={'text'}
                            value={formik.values.invoice_bill_from_place}
                            name={'invoice_bill_from_place'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Invoice Bill From Place'}
                            required={true}
                        />
                        {formik.touched.invoice_bill_from_place && formik.errors.invoice_bill_from_place && (
                            <FormHelperText error id={'standard-weight-helper-text-invoice_bill_from_place'}>
                                {formik.errors.invoice_bill_from_place}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // TAX Details Title
            isGSTRegistered && registrationType == 'composition' && (
                <Grid key={'1-title-3'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>TAX Details</span>
                </Grid>
            ),

            // Tax Rate
            isGSTRegistered && registrationType == 'composition' && (
                <Grid key={'1-13'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.tax_rate && formik.errors.tax_rate)}>
                        <InputLabel htmlFor={'outlined-label-tax_rate'}>Tax Rate</InputLabel>
                        <OutlinedInput
                            id={'outlined-tax_rate'}
                            type={'number'}
                            value={formik.values.tax_rate}
                            name={'tax_rate'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Tax Rate'}
                            required={true}
                        />
                        {formik.touched.tax_rate && formik.errors.tax_rate && (
                            <FormHelperText error id={'standard-weight-helper-text-tax_rate'}>
                                {formik.errors.tax_rate}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            ),

            // Tax Calculation Type
            isGSTRegistered && registrationType == 'composition' && (
                <Grid key={'1-14'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.tax_calculation_type && formik.errors.tax_calculation_type)}>
                        <InputLabel htmlFor={'outlined-label-tax_calculation_type'}>Tax Calculation Type</InputLabel>
                        <Select
                            labelId={'outlined-label-tax_calculation_type'}
                            id={'outlined-tax_calculation_type'}
                            value={formik.values.tax_calculation_type}
                            name={'tax_calculation_type'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'Tax Calculation Type'}
                            required={true}
                        >
                            {[
                                {
                                    id: 'taxable_exempt_and_nil_rated_values',
                                    name: 'Taxable, Exempt, & Nil Rated Values'
                                },
                                {
                                    id: 'taxable_value',
                                    name: 'Taxable Value'
                                }
                            ].map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.tax_calculation_type && formik.errors.tax_calculation_type && (
                            <FormHelperText error id={'standard-weight-helper-text-tax_calculation_type'}>
                                {formik.errors.tax_calculation_type}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            )
        ],
        [
            // CIN Number
            isGSTRegistered && (
                <Grid key={'1-9'} item md={4}>
                    <FormControl fullWidth error={Boolean(formik.touched.cin_number && formik.errors.cin_number)}>
                        <InputLabel htmlFor={'outlined-label-cin_number'}>CIN Number</InputLabel>
                        <OutlinedInput
                            id={'outlined-cin_number'}
                            type={'text'}
                            value={formik.values.cin_number}
                            name={'cin_number'}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={'CIN Number'}
                        />
                        {formik.touched.cin_number && formik.errors.cin_number && (
                            <FormHelperText error id={'standard-weight-helper-text-cin_number'}>
                                {formik.errors.cin_number}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            )
        ],
        [
            // Bank Name
            <Grid key={'2-0'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_name && formik.errors.bank_name)}>
                    <InputLabel htmlFor={'outlined-label-bank_name'}>Bank Name</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_name'}
                        type={'text'}
                        value={formik.values.bank_name}
                        name={'bank_name'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Bank Name'}
                        autoFocus={true}
                        required={true}
                    />
                    {formik.touched.bank_name && formik.errors.bank_name && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_name'}>
                            {formik.errors.bank_name}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Account Holder Name
            <Grid key={'2-1'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.account_holder_name && formik.errors.account_holder_name)}>
                    <InputLabel htmlFor={'outlined-label-account_holder_name'}>Account Holder Name</InputLabel>
                    <OutlinedInput
                        id={'outlined-account_holder_name'}
                        type={'text'}
                        value={formik.values.account_holder_name}
                        name={'account_holder_name'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Account Holder Name'}
                        required={true}
                    />
                    {formik.touched.account_holder_name && formik.errors.account_holder_name && (
                        <FormHelperText error id={'standard-weight-helper-text-account_holder_name'}>
                            {formik.errors.account_holder_name}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Account Number
            <Grid key={'2-2'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.account_number && formik.errors.account_number)}>
                    <InputLabel htmlFor={'outlined-label-account_number'}>Account Number</InputLabel>
                    <OutlinedInput
                        id={'outlined-account_number'}
                        type={'text'}
                        value={formik.values.account_number}
                        name={'account_number'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Account Number'}
                        required={true}
                    />
                    {formik.touched.account_number && formik.errors.account_number && (
                        <FormHelperText error id={'standard-weight-helper-text-account_number'}>
                            {formik.errors.account_number}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // IFSC Code
            <Grid key={'2-3'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_ifsc && formik.errors.bank_ifsc)}>
                    <InputLabel htmlFor={'outlined-label-bank_ifsc'}>IFSC Code</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_ifsc'}
                        type={'text'}
                        value={formik.values.bank_ifsc}
                        name={'bank_ifsc'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'IFSC Code'}
                        required={true}
                    />
                    {formik.touched.bank_ifsc && formik.errors.bank_ifsc && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_ifsc'}>
                            {formik.errors.bank_ifsc}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Swift Code
            <Grid key={'2-4'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_swift && formik.errors.bank_swift)}>
                    <InputLabel htmlFor={'outlined-label-bank_swift'}>Swift Code</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_swift'}
                        type={'text'}
                        value={formik.values.bank_swift}
                        name={'bank_swift'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Swift Code'}
                    />
                    {formik.touched.bank_swift && formik.errors.bank_swift && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_swift'}>
                            {formik.errors.bank_swift}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Branch Name
            <Grid key={'2-5'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_branch && formik.errors.bank_branch)}>
                    <InputLabel htmlFor={'outlined-label-bank_branch'}>Branch Name</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_branch'}
                        type={'text'}
                        value={formik.values.bank_branch}
                        name={'bank_branch'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Branch Name'}
                        required={true}
                    />
                    {formik.touched.bank_branch && formik.errors.bank_branch && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_branch'}>
                            {formik.errors.bank_branch}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Bank Address
            <Grid key={'2-6'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_address && formik.errors.bank_address)}>
                    <InputLabel htmlFor={'outlined-label-bank_address'}>Bank Address</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_address'}
                        type={'text'}
                        value={formik.values.bank_address}
                        name={'bank_address'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Bank Address'}
                        required={true}
                        multiline={true}
                        rows={3}
                    />
                    {formik.touched.bank_address && formik.errors.bank_address && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_address'}>
                            {formik.errors.bank_address}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Bank GST
            <Grid key={'2-7'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_gst && formik.errors.bank_gst)}>
                    <InputLabel htmlFor={'outlined-label-bank_gst'}>Bank GST</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_gst'}
                        type={'text'}
                        value={formik.values.bank_gst}
                        name={'bank_gst'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Bank GST'}
                        inputProps={{
                            pattern: '.{15}',
                            title: 'GST number should be 15 characters.'
                        }}
                    />
                    {formik.touched.bank_gst && formik.errors.bank_gst && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_gst'}>
                            {formik.errors.bank_gst}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Bank Opening Balance
            <Grid key={'2-8'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_opening_balance && formik.errors.bank_opening_balance)}>
                    <InputLabel htmlFor={'outlined-label-bank_opening_balance'}>Bank Opening Balance</InputLabel>
                    <OutlinedInput
                        id={'outlined-bank_opening_balance'}
                        type={'number'}
                        value={formik.values.bank_opening_balance}
                        name={'bank_opening_balance'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Bank Opening Balance'}
                        required={true}
                    />
                    {formik.touched.bank_opening_balance && formik.errors.bank_opening_balance && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_opening_balance'}>
                            {formik.errors.bank_opening_balance}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Bank Balance Type
            <Grid key={'2-9'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.bank_balance_type && formik.errors.bank_balance_type)}>
                    <InputLabel htmlFor={'outlined-label-bank_balance_type'}>Bank Balance Type</InputLabel>
                    <Select
                        labelId={'outlined-label-bank_balance_type'}
                        id={'outlined-bank_balance_type'}
                        value={formik.values.bank_balance_type}
                        name={'bank_balance_type'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Bank Balance Type'}
                        required={true}
                    >
                        {[
                            {
                                id: 'CR',
                                name: 'CR (Credit)'
                            },
                            {
                                id: 'DR',
                                name: 'DR (Debit)'
                            }
                        ].map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.bank_balance_type && formik.errors.bank_balance_type && (
                        <FormHelperText error id={'standard-weight-helper-text-bank_balance_type'}>
                            {formik.errors.bank_balance_type}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>,

            // Print in Invoice
            <Grid key={'2-10'} item md={4}>
                <FormControl fullWidth error={Boolean(formik.touched.print_in_invoice && formik.errors.print_in_invoice)}>
                    <InputLabel htmlFor={'outlined-label-print_in_invoice'}>Print in Invoice</InputLabel>
                    <Select
                        labelId={'outlined-label-print_in_invoice'}
                        id={'outlined-print_in_invoice'}
                        value={formik.values.print_in_invoice}
                        name={'print_in_invoice'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Print in Invoice'}
                        required={true}
                    >
                        {[
                            {
                                id: true,
                                name: 'Yes'
                            },
                            {
                                id: false,
                                name: 'No'
                            }
                        ].map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.print_in_invoice && formik.errors.print_in_invoice && (
                        <FormHelperText error id={'standard-weight-helper-text-print_in_invoice'}>
                            {formik.errors.print_in_invoice}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        ]
    ];

    // const x = [setIsEInvoicingApplicable, isEWayBillApplicable, isEInvoicingApplicable, registrationType, setRegistrationType, setIsEWayBillApplicable, FormHelperText, OutlinedInput, isGSTRegistered, setIsGSTRegistered]
    // x && x

    const sectionTitles = [
        addCompanyDialog ? 'Company Creation' : 'Alter Company',
        'Statutory Details',
        'Additional Details',
        'Bank Details'
    ];

    return (
        <>
            <Box mx={2} width={250} display="flex" alignItems="center" justifyContent="center">
                <Formik
                    initialValues={{
                        company: currentCompany != null ? currentCompany.id : ''
                    }}
                    enableReinitialize
                >
                    {({ handleChange, values }) => (
                        <FormControl fullWidth>
                            <InputLabel id="company-label">Company</InputLabel>
                            <Select
                                labelId="company-label"
                                id="company"
                                name="company"
                                value={values.company}
                                onChange={(e) => {
                                    handleChange(e);
                                    const companyId = e.target.value;
                                    setCurrentCompany(companies.find((company) => company.id == companyId));
                                }}
                                label="Company"
                                fullWidth
                                onOpen={() => setIsCompanySelectOpen(true)}
                                onClose={() => setIsCompanySelectOpen(false)}
                            >
                                {companies.map((comp) => {
                                    const company = Object.fromEntries(
                                        Object.entries(comp).map(([key, value]) => {
                                            return [key, value != null ? value : ''];
                                        })
                                    );
                                    return (
                                        <MenuItem key={company.id} value={company.id}>
                                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                                {/* <span>{company.name.slice(0, company.name.length)}</span> */}
                                                <span>
                                                    {company.name.length > 20
                                                        ? isCompanySelectOpen
                                                            ? company.name
                                                            : company.name.substring(0, 20) + '...'
                                                        : company.name}
                                                </span>
                                                <Settings
                                                    stroke={1}
                                                    size="0.8rem"
                                                    style={{ display: isCompanySelectOpen ? null : 'none' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();

                                                        setAddCompanyDialog(false);
                                                        setEditCompanyDialog(true);

                                                        setIsGSTRegistered(company.registration_status);
                                                        setRegistrationType(company.registration_type);
                                                        setIsEWayBillApplicable(company.e_way_bill_applicable);
                                                        setIsEInvoicingApplicable(company.e_invoicing_applicable);

                                                        formik.resetForm({
                                                            values: {
                                                                ...(company ? company : {})
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                </Formik>
                <Tooltip title="Add company" arrow>
                    <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={() => {
                                setAddCompanyDialog(true);
                                setEditCompanyDialog(false);
                            }}
                            color="inherit"
                        >
                            <IconSquareRoundedPlus stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                </Tooltip>

                <Dialog open={addCompanyDialog || editCompanyDialog} maxWidth="lg" fullWidth>
                    <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]}`}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize="1.3rem" fontWeight="bold">
                            <Box width={'100%'} textAlign={'center'}>
                                <span>{sectionTitles[currentSection]}</span>
                            </Box>
                            <ButtonBase sx={{ borderRadius: '12px', marginX: 1, display: companies.length == 0 ? 'none' : null }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.mediumAvatar,
                                        transition: 'all .2s ease-in-out',
                                        background: theme.palette.secondary.light,
                                        color: theme.palette.secondary.dark,
                                        '&[aria-controls="menu-list-grow"],&:hover': {
                                            background: theme.palette.secondary.dark,
                                            color: theme.palette.secondary.light
                                        }
                                    }}
                                    onClick={() => {

                                        setAddCompanyDialog(false);
                                        setEditCompanyDialog(false);
                                        // setCurrentSection(0)
                                    }}
                                    color="inherit"
                                >
                                    <IconSquareRoundedX stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ButtonBase>
                        </Box>
                    </DialogTitle>

                    <form onSubmit={formik.handleSubmit} ref={formRef}>
                        <DialogContent style={{ borderBottom: `1px solid $theme.palette.secondary[800] ` }}>
                            <Grid container spacing={2} my={2}>
                                {/* Sections */}
                                {sections[currentSection]}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <DialogTitle>
                                <Grid container spacing={2}>
                                    {currentSection > 0 && (
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    setCurrentSection(currentSection - 1);
                                                }}
                                                type="button"
                                            >
                                                Prev
                                            </Button>
                                        </Grid>
                                    )}
                                    {sections && currentSection + 1 != sections?.length && (
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    if (formRef.current.reportValidity()) {
                                                        setCurrentSection(currentSection + 1);
                                                    }
                                                }}
                                                type="button"
                                            >
                                                Next
                                            </Button>
                                        </Grid>
                                    )}
                                    {
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                style={{ display: sections && currentSection + 1 != sections?.length ? 'none' : '' }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {addCompanyDialog && 'Save'}
                                                {editCompanyDialog && 'Update'}
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </DialogTitle>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </>
    );
}
