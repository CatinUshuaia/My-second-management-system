import Formsearch from "../components/Formsearch"


const View = () => {
    return (
        <>
        <div style={{ fontSize: 30, paddingLeft: 10, lineHeight: '48px', color: 'grey' }}>
            Search Record
        </div>
        <div className="formsearch">      
            <Formsearch/>
        </div> 
        </>
    )
}

export default View