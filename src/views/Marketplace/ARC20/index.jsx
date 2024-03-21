import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Paginator } from 'primereact/paginator';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


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
        "activity": 17,
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
        "activity": 0,
        "representative": {
            "name": "Amy Elsner",
            "image": "amyelsner.png"
        },
        "balance": 82429
    }
]

const ARC20 = () => {
    const [first, setFirst] = useState(0);
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const columns = [
        {field: 'id', header: 'Token'},
        {field: 'name', header: 'Price'},
        {field: 'status', header: 'Change 24H'},
        {field: 'balance', header: 'Volume 24H'},
        {field: 'balance', header: 'Total Volume'},
        {field: 'balance', header: 'Marketcap'},
        {field: 'balance', header: 'Total Supply'},
        {field: 'balance', header: 'Token Holders'},
        {field: 'balance', header: 'Minted'},
    ];

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    const gotoDetail = (e) => {
        console.log('e::', e)
        history.push(`/market/arc20/${e.id}`)
    }

    useEffect(() => {
        setProducts(data)
    }, []);

    return(
        <ARCWrapper>
            <DataTable 
                value={products} 
                onSelectionChange={(e) => gotoDetail(e.value)} 
                selectionMode="single" 
                tableStyle={{ minWidth: '50rem' }}
                dataKey="id"
            >
                {
                    columns.map((col, i) => {
                        return <Column key={i} field={col.field} header={col.header} />
                    })
                }
            </DataTable>
            <PaginatorWrapper first={first} rows={10} totalRecords={120} onPageChange={onPageChange} />
        </ARCWrapper>
    )
}

export default ARC20

const ARCWrapper = styled.div`
    padding: 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const PaginatorWrapper = styled(Paginator)`
    margin-top: 1rem;
`

