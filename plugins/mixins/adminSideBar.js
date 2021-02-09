
export default {
    data: () => ({
        adminList: [
            { name: 'Product Categories', icon: 'mdi-shape', url: '/admin/categories' },
            { name: 'Product Brands', icon: 'mdi-grain', url: '/admin/brands' },
            { name: 'Product Classifications', icon: 'mdi-shape', url: '/admin/classifications' },
            { name: 'Product Packages', icon: 'mdi-account-supervisor', url: '/admin/packages' },
            { name: 'Product Groups', icon: 'mdi-shape', url: '/admin/groups' },
            { name: 'Products', icon: 'mdi-post-outline', url: '/admin/products' },
            { name: 'Expired Products', icon: 'mdi-post-outline', url: '/admin/expiredProducts' },
            { name: 'About to Expire ', icon: 'mdi-post-outline', url: '/admin/aboutExpiring' },
            { name: 'Out-Of-Stock Products', icon: 'mdi-post-outline', url: '/admin/outOfStock' },
        ],
        refillList: [
            { name: 'Refills', icon: 'mdi-shape', url: '/admin/refills' }
        ],
        transactionList: [
            { name: 'Point of Sale', icon: 'mdi-point-of-sale', url: '/admin/pointOfSale' },
            { name: 'Transactions', icon: 'mdi-transit-connection-horizontal', url: '/admin/transactions' },
        ],
        branchList: [
            { name: 'Pharmacy Branch', icon: 'mdi-shape', url: '/admin/branches' },
        ],
        diseaseList: [
            { name: 'Diseases', icon: 'mdi-grain', url: '/admin/diseases' },
        ],
        prescriptionList: [
            { name: 'Prescriptions', icon: 'mdi-supervisor', url: '/admin/prescriptions' },
        ],
        loyaltyList: [
            { name: 'Loyalties', icon: 'mdi-shape', url: '/admin/loyalties' },
        ],
        userList: [
            { name: 'Roles', icon: 'mdi-post', url: '/admin/roles' },
            { name: 'Users', icon: 'mdi-account', url: '/admin/users' },
        ],
    }),
}