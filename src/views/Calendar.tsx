import Remarks from "@/components/Calendar"


export default function View() {
    return(
        <div className="user">
            <div style={{ fontSize: 30, textAlign: 'left', padding: 20, lineHeight: '48px', color: 'grey' }}>
                <p>Remarks</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Remarks />
            </div>
        </div>
    )
}
