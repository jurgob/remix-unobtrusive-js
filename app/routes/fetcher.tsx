import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useRouteError,useNavigate, useLoaderData } from "@remix-run/react";



const MOCKED_INVOICES_PAGES = [
    {
        id: "0",
        invoices: [
            {
                id: "myid", 
                desc: "this is the myid invoice"
            },
            {
                id: "yourid", 
                desc: "this is yourid invooice"
            }   
        ]

    },
    {
        id: "1",
        invoices: [
            {
                id: "myid1", 
                desc: "this is the myid1 invoice"
            },
            {
                id: "yourid1", 
                desc: "this is yourid1 invooice"
            }   
        ]

    }
]

const getMockPage = async (page_number:number) => {
    return MOCKED_INVOICES_PAGES[page_number];
}

export const loader = async ({
    request,
  }: LoaderFunctionArgs) => {
    const pageNumberParam = parseInt(new URL(request.url).searchParams.get('page_number')|| "") ;
    const pageNumber= pageNumberParam || 0
    if(!Number.isInteger(pageNumber)){
        throw json(
            { message: "invalid page number" },
            { status: 400 }
          );
    }
    
    
    console.log("pageNumber", pageNumber);
    const pageData = await getMockPage(pageNumber);
    console.log("pageData", pageData)


    if (!pageData) {
      throw json(
        { message: "page number does not exist" },
        { status: 401 }
      );
    }
  
    return json(pageData);
  };


  export function ErrorBoundary() {
    const error = useRouteError();
    return (<div>
        <h1 className="bg-red-500" >ERRROR ERROR</h1>
        <pre className="bg-gray-400" >{JSON.stringify(error, null, 2)}</pre>
        
        </div>
        )
  }


export default function Fetcher() {
    const loaderData = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    const fetcher = useFetcher();
    

    console.log(`fetcher`, fetcher)
    const data = fetcher.data

    return (
        <div>
            <h1>Fetcher/Navigation</h1>
            <h2>Loader data</h2>
            <div>
                {loaderData 
                    ? <pre className="bg-gray-100 p-6 inline-block" >
                        {JSON.stringify(loaderData, null, 2)}</pre>
                    : <div>No Data</div>
                }
                 
            </div>
            <h2>Fetcher data</h2>
            <div>
                {data 
                    ? <pre className="bg-gray-100 p-6 inline-block" >
                        {JSON.stringify(data, null, 2)}</pre>
                    : <div>No Data</div>
                }
                 
            </div>
            <h2>fetcher</h2>
            <div className="flex">
                <button className="bg-green-400"  onClick={() => {
                    fetcher.submit({
                        page_number:"0"
                    })
                }}>get page 0</button>
                <button className="bg-green-400"  onClick={() => {
                    fetcher.submit({
                        page_number:"1"
                    })
                }}>get page 1</button>
                <button className="bg-red-400"  onClick={() => {
                    fetcher.submit({
                        page_number:"2"
                    })
                }}>get page 2 (not existing)</button>
                <button className="bg-red-400"  onClick={() => {
                    fetcher.submit({
                        page_number:"notinteger"
                    })
                }}>get page notinteger (throw invalid pagenumber error)</button>
            </div>
            <h2>navigation</h2>
            <div className="flex">
                <button className="bg-green-400"  onClick={() => {
                    navigate({
                        search: "?page_number=0",
                      })
                }}>get page 0</button>
                <button className="bg-green-400"  onClick={() => {
                    navigate({
                        search: "?page_number=1",
                      })
                }}>get page 1</button>
                <button className="bg-red-400"  onClick={() => {
                    navigate({
                        search: "?page_number=2",
                      })
                }}>get page 2 (not existing)</button>
                <button className="bg-red-400"  onClick={() => {
                    navigate({
                        search: "?page_number=notinteger",
                      })
                }}>get page notinteger (throw invalid pagenumber error)</button>
            </div>
        </div>
    )
}
