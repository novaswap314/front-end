import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Paginator } from 'primereact/paginator';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Row } from '@/theme/base';

let data = [
    {
        "id": 1000,
        "name": "James Butt",
        "country": {
            "name": "Algeria",
            "code": "dz"
        },
        "company": "Benton, John B Jr",
        "date": "2015-09-13",
        "status": "unqualified",
        "verified": true,
        "activity": 47,
        "representative": {
            "name": "Ioni Bowcher",
            "image": "ionibowcher.png"
        },
        "balance": 70663
    },
    {
        "id": 1001,
        "name": "Josephine Darakjy",
        "country": {
            "name": "Egypt",
            "code": "eg"
        },
        "company": "Chanay, Jeffrey A Esq",
        "date": "2019-02-09",
        "status": "proposal",
        "verified": true,
        "activity": 2,
        "representative": {
            "name": "Amy Elsner",
            "image": "amyelsner.png"
        },
        "balance": 82429
    }
]

const HotToken = () => {
    const [first, setFirst] = useState(0);
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const columns = [
        {field: 'id', header: 'Token'},
        {field: 'name', header: 'Progress'},
        {field: 'status', header: 'CirculatingSupply'},
        {field: 'balance', header: 'TotalSupply'},
        {field: 'balance', header: 'Amount Per Mint'},
        {field: 'balance', header: 'Bitwork'},
        {field: 'balance', header: 'Holders'},
        {field: 'balance', header: 'Deployed'},
    ];

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    const progressTemplate = (product) => {
        return <ProgressBar value={50} />
    }

    useEffect(() => {
        setProducts(data)
    }, []);

    return(
        <TokenWrapper>
            <DataTable 
                value={products}
                selectionMode="single" 
                tableStyle={{ minWidth: '70rem' }}
                dataKey="id"
            >
                <Column field="id" header="Token" />
                <Column header="Progress" body={(row) => {return <ProgressBar value={row.activity} />}} />
                <Column field="name" header="Total Supply" />
                <Column field="name" header="Mint Amount" />
                <Column field="name" header="Bitwork" />
                <Column field="name" header="Holders" />
                <Column field="name" header="Ongoing Mint" />
                <Column header="Mint Now!" body={(row) => { return <Button rounded><i className='icon i-tabler-dashboard'></i><span>Fast Mint</span></Button> }} />
                <Column field="name" header="Deployed" />
            </DataTable>
            <PaginatorWrapper first={first} rows={10} totalRecords={120} onPageChange={onPageChange} />
        </TokenWrapper>
    )
}

const TokenWrapper = styled.div`
    padding: 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});

    .icon {
        font-size: 1.3rem;
        margin-right: 0.2rem;
    }
`
const PaginatorWrapper = styled(Paginator)`
    margin-top: 1rem;
`
export default HotToken

