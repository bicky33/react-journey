import { Dispatch, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Product{
    category: string, 
    price: string, 
    name: string,
    stocked: boolean,
}

interface Products extends Array<Product>{};

const PRODUCTS : Products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function SearchBar({filterText, stockedOnly, onStockedOnly, onFilterText }:{filterText: string, stockedOnly:boolean, onStockedOnly: Dispatch<boolean>, onFilterText:Dispatch<string>}):JSX.Element{
    return (
        <form>
            <input type="text" placeholder='search' onChange={(e)=>onFilterText(e.target.value)} value={filterText} style={{display:'block'}} />
            <label htmlFor="stock">
                <input type="checkbox" checked={stockedOnly}  onChange={(e)=>onStockedOnly(e.target.checked)} />
                Only show products in stock
            </label>
        </form>
    )
}


function CategoryRow({category}:{category:string}):JSX.Element {
    return (
        <tr>
            <td colSpan={2} style={{fontWeight:700}}>{category}</td>
        </tr>
    )
}

function ProductRow({product} : {product: Product}):JSX.Element {
    const name = !product.stocked ? <span style={{color: 'red'}}>{product.name}</span> : product.name;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductTable({products, filterText, stockedOnly} : {products:Products, filterText: string, stockedOnly:boolean}):JSX.Element {
    const rows : JSX.Element[]= [];
    let lastCategory : string = '';
    products.forEach( (product: Product) => {
        
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 ) {
            return;
        }
        
        if (stockedOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <CategoryRow category={product.category} key={product.category}/>
            );
        }
        rows.push(
            <ProductRow product={product} key={product.name}/>
        );
        lastCategory = product.category;
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}

function FilterableProductTable():JSX.Element {
    const [filterText, setFilterText] = useState<string>('');
    const [stockedOnly, setstockedOnly] = useState<boolean>(false);

    return (
        <>
            <SearchBar 
                filterText={filterText} 
                stockedOnly={stockedOnly}
                onStockedOnly={setstockedOnly}
                onFilterText={setFilterText}
            />
            <ProductTable 
                products={PRODUCTS}
                filterText={filterText} 
                stockedOnly={stockedOnly}
            />
        </>
    );
}


function App() {

  return (
    <div className="App">
        <FilterableProductTable/>
    </div>
  )
}

export default App
