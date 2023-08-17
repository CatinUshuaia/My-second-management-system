import Teamstatus from "../components/Teamstatus"

export default function View() {
    return (
        <div className="user">
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Team</p>
            </div>
            <Teamstatus />
        </div>
    )
}
