const createDatatable = async () => {
    const response = await fetch('/sales', { method: 'GET' });
    const sales = await response.json();
    table = document.getElementById('example');

    $(document).ready(function () {
        const datatable = $('#custom-datatable').DataTable({
            responsive: true,
            scrollX: true,
            fixedHeader: true,
            data: sales,
            columns: [
                { data: 'ORDER_NO' },
                { data: 'ORDER_QTY' },
                { data: 'UNIT_PRICE' },
                { data: 'SALES' },
                { data: 'ORDER_DATE' },
                { data: 'STATUS' },
                { data: 'QUATER_ID' },
                { data: 'MONTH_ID' },
                { data: 'YEAR_ID' },
                { data: 'PRODUCT_LINE' },
                { data: 'MSRP' },
                { data: 'PRODUCT_CODE' },
                { data: 'CUSTOMER_NAME' },
                { data: 'PHONE' },
                { data: 'ADDRESS_LINE_1' },
                { data: 'ADDRESS_LINE_2' },
                { data: 'CITY' },
                { data: 'STATE' },
                { data: 'POSTAL_CODE' },
                { data: 'COUNTRY' },
                { data: 'TERRITORY' },
                { data: 'CONTACT_LAST_NAME' },
                { data: 'CONTACT_FIRST_NAME' },
                { data: 'DEAL_SIZE' }
            ],
        });
    });
};


createDatatable();