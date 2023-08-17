import Remarks from "@/components/Remarks"
import Showcalendar from "@/components/Calendar"


export default function View() {
    return (
        <div className="user">
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Remarks</p>
            </div>
            <Remarks />
            <Showcalendar  />
        </div>
    )
}
