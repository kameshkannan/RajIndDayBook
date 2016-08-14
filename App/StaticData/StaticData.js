//Common is used to load dropdownValues for all the pages

//var dayBook = {

//    toDay: [
//            {
//                id: 1,
//                particulars: 'BySales',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '3400',
//                cashPayment: ''
//            },
//            {
//                id: 2,
//                particulars: 'BySales',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '2500',
//                cashPayment: ''
//            },
//            {
//                id: 3,
//                particulars: 'By Cash',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '',
//                cashPayment: '1200'
//            },
//            {
//                id: 4,
//                particulars: 'By Cash',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '',
//                cashPayment: '200'
//            },
//            {
//                id: 5,
//                particulars: 'By Sales',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '4500',
//                cashPayment: ''
//            },
//            {
//                id: 6,
//                particulars: 'By Sales',
//                configuredTranId: '',
//                bankId: '',
//                transferModeId: '',
//                cashReceipt: '4500',
//                cashPayment: ''
//            },
//            {
//                id: 7,
//                particulars: 'To Hi-Tech Farms',
//                configuredTranId: 2,
//                bankId: 3,
//                transferModeId: 1,
//                cashReceipt: '',
//                cashPayment: '25000'
//            },
//            {
//                id: 8,
//                particulars: 'To Dharanee',
//                configuredTranId: 1,
//                bankId: 1,
//                transferModeId: 1,
//                cashReceipt: '',
//                cashPayment: '15000'
//            },
//            {
//                id: 9,
//                particulars: 'To Dharanee',
//                configuredTranId: 1,
//                bankId: 2,
//                transferModeId: 3,
//                cashReceipt: '',
//                cashPayment: '10000'
//            }
//    ]
//};

var banks = {
    configuredBanks: [
        {
            id: 1,
            bankName: 'State Bank of India',
            bankShortName: 'SBI',
            transferTypes: [
                {
                    id: 1,
                    transferName: 'NEFT'
                },
                {
                    id: 2,
                    transferName: 'RTGS'
                }
            ]
        },
        {
            id: 2,
            bankName: 'Karur Vysa Bank',
            bankShortName: 'KVB',
            transferTypes: [
                {
                    id: 3,
                    transferName: 'IMPS'
                },
                {
                    id: 4,
                    transferName: 'CASH'
                }
            ]
        },
        {
            id: 3,
            bankName: 'ICICI Bank',
            bankShortName: 'ICICI',
            transferTypes: [
                {
                    id: 1,
                    transferName: 'NEFT'
                },
                {
                    id: 2,
                    transferName: 'RTGS'
                },
                {
                    id: 3,
                    transferName: 'IMPS'
                },
                {
                    id: 4,
                    transferName: 'CASH'
                }
            ]
        }
    ],
    modeOfTransfers: [
        {
            id: 1,
            transferName: 'NEFT'
        },
        {
            id: 2,
            transferName: 'RTGS'
        },
        {
            id: 3,
            transferName: 'IMPS'
        },
        {
            id: 4,
            transferName: 'CASH'
        }
    ]
};

var configuredBankTrans1 = {
    list: [
        {
            id: 1,
            tranName: 'To Dharanee',
            banks: [
                {
                    bankId: 1,
                    transferModes: [
                        {
                            transferId: 1
                        },
                        {
                            transferId: 2
                        }
                    ]
                },
                {
                    bankId: 2,
                    transferModes: [
                        {
                            transferId: 3
                        },
                        {
                            transferId: 4
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            tranName: 'To Hi-Tech Farms',
            banks: [

                    {
                        bankId: 3,
                        transferModes: [
                            {
                                transferId: 1
                            },
                            {
                                transferId: 3
                            }
                        ]
                    }

            ]
        }
    ]
}

