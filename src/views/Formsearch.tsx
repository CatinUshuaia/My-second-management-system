import Searchtest from "@/components/Searchtest"


const View = () => {
    return (
        <>
        <div style={{ fontSize: 30, paddingLeft: 10, lineHeight: '48px', color: 'grey' }}>
            Search Record
        </div>
        <div className="formsearch">      
            <Searchtest  />
        </div> 
        </>
    )
}

export default View